//Servicio para los tickets
const { SQL, PoolPromise } = require('../config/db');

const createService = async(req, res)=>{
    try{
        const { licensePlate, idPay, idUser } = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('licensePlate', SQL.VarChar, licensePlate)
            .input('idType', SQL.Int, idPay)
            .input('idUser', SQL.Int, idUser)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_CreateTicket');



        console.log("[INFO] createService: Ticket created successfully for car with license plate:", licensePlate);
        return {result: true, message: 'Ticket created Succesfully', qrString:`IS-${result.recordset[0].idTicket}-GP3`};
        
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

const getId = (qrString) => {
    const parts = qrString.split('-');

    if(!parts[0]==='IS' || !parts[2]==='GP3') return

    const idTicket = parts[1];
    return idTicket;
}

const updateService = async(req, res)=>{
    try{
        const { qrString, idUser, ip, idPay, idType } = req.body;

        const pool = await PoolPromise;

        const idTicket = getId(qrString);
        if(!idTicket) return {result: false, message: 'Invalid QR code'};

        const amount = await calculateAmount(qrString,idType,idPay);
        if (!amount.result === false) return amount; // Si hay error en el cálculo

        const result = await pool.request()
            .input('idTicket',SQL.Int, idTicket)
            .input('idUser', SQL.Int, idUser)
            .input('amount',SQL.Decimal,amount.total)
            .input('ip', SQL.VarChar, ip)
            .execute('sp_closeTicket');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to close ticket'};


        console.log("[INFO] updateService: Ticket with ID", idTicket, "closed successfully");
        return {result: true, message: 'Ticket closed Succesfully'};
    } catch(err){
        console.error('[ERROR] updateService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

async function calculateAmount(qrString,idType,idPay) {
    const idTicket = getId(qrString)

    if(!idTicket) return {result:false, message:'QR String invalid'}

    const pool = await PoolPromise;
    const result = await pool.request()
        .input('idTicket', SQL.Int, idTicket)
        .input('idType',SQL.Int,idType)
        .input('idPay',SQL.Int,idPay)
        .execute('sp_GetTicketInfo');

    const ticketData = result.recordset[0];
    if (!ticketData) return { result: false, message: 'Ticket not found' };

    const horaEntrada = new Date(ticketData.horaEntrada);
    const horaActual = new Date();
    const diffMs = horaActual - horaEntrada;
    const diffMinutos = diffMs / 60000;

    const GRACE_PERIOD_MINS = 5;
    let unidadesACobrar = 0;
    const tipo = ticketData.tipoCobro.toUpperCase(); // 'HORA', 'DIA', 'MEDIA HORA'

    if (tipo === 'HORA') {
        const horasCompletas = Math.floor(diffMinutos / 60);
        const minutosRestantes = diffMinutos % 60;
        unidadesACobrar = minutosRestantes > GRACE_PERIOD_MINS ? horasCompletas + 1 : horasCompletas;
    } 
    else if (tipo === 'DIA') {
        const diasCompletos = Math.floor(diffMinutos / 1440);
        const minutosRestantes = diffMinutos % 1440;
        unidadesACobrar = minutosRestantes > GRACE_PERIOD_MINS ? diasCompletos + 1 : diasCompletos;
    } 
    else if(tipo === 'MEDIA HORA'){
        const mediasCompletas = Math.floor(diffMinutos / 30);
        const minutosRestantes = diffMinutos % 30;
        unidadesACobrar = minutosRestantes > GRACE_PERIOD_MINS ? mediasCompletas + 1 : mediasCompletas;
    }

    // Aseguramos que al menos se cobre 1 unidad
    if (unidadesACobrar < 1) unidadesACobrar = 1;

    const multiplicador = ticketData.multiplicador_tarifa || 1;
    const subtotal = ticketData.montoCobro * unidadesACobrar;
    const total = subtotal * multiplicador;

    return {
        result: true,
        total: total,
        unidades: unidadesACobrar,
        tipo: tipo
    };
}

module.exports = {
    createService,
    updateService
}