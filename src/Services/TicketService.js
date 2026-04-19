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

const updateService = async(req, res)=>{
    try{
        const { qrString, idUser, ip } = req.body;

        const parts = qrString.split('-');

        if(!parts[0]==='IS' || !parts[2]==='GP3') return {result: false, message: 'Invalid QR String'}

        const idTicket = parts[1];

        const pool = await PoolPromise;

        const amount = await calculateAmount(idTicket);

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

async function calculateAmount(idTicket) {
    const pool = await PoolPromise;
    const result = await pool.request()
        .input('idTicket', SQL.Int, idTicket)
        .execute('sp_GetTicketInfo');

    const ticketData = result.recordset[0];
    if (!ticketData) return { result: false, message: 'Ticket not found' };

    const horaEntrada = new Date(ticketData.horaEntrada);
    const horaActual = new Date();
    const diffMs = horaActual - horaEntrada;

    let unidadesACobrar = 0;
    const tipo = ticketData.tipoCobro.toUpperCase(); // 'HORA' o 'DIA'

    if (tipo === 'HORA') {
        // Convertimos ms a horas (1000 * 60 * 60)
        const diffHoras = diffMs / 3600000;
        unidadesACobrar = Math.ceil(diffHoras); 
    } 
    else if (tipo === 'DIA') {
        // Convertimos ms a días (1000 * 60 * 60 * 24)
        const diffDias = diffMs / 86400000;
        // Si entró hoy y sale hoy, se cobra 1 día mínimo
        unidadesACobrar = Math.ceil(diffDias) || 1;
    } else if(tipo==='MEDIA HORA'){
        // Convertimos ms a medias horas
        const diffDias = diffMs / 1800000;
        // Si entró hoy y sale hoy, se cobra 1 día mínimo
        unidadesACobrar = Math.ceil(diffDias) || 1;
    }

    // Aseguramos que al menos se cobre 1 unidad (hora o día)
    if (unidadesACobrar < 1) unidadesACobrar = 1;

    const total = ticketData.montoCobro * unidadesACobrar;

    return {
        total: total,
        unidades: unidadesACobrar,
        tipo: tipo
    };
}

module.exports = {
    createService,
    updateService
}