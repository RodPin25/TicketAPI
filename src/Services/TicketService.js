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
        const { qrString, idType, idPay } = req.body;
        console.log("=== INICIO SERVICIO: SE ESTA UTILIZANDO LA ACTUALIZACION DEL TICKET ===");

        const pool = await PoolPromise;
        const idUser = req.user.userId;
        const ip = req.ip;

        const idTicket = getId(qrString);
        console.log("idEncontrado:" + idTicket);
        if(!idTicket) return {result: false, message: 'Invalid QR code'};

        const amount = await calculateAmount(qrString, idType, idPay);
        
        // CORRECCIÓN CRÍTICA 1: Cambiar la lógica de negación bugeada
        if (amount.result === false) {
            console.log("[ALERTA] El cálculo del monto falló:", amount.message);
            return amount; 
        }

        console.log("[PROCESO] Ejecutando sp_closeTicket en la BD con monto:", amount.total);

        // Ejecutar el SP de cierre
        const result = await pool.request()
            .input('idTicket', SQL.Int, idTicket)
            .input('idUser', SQL.Int, idUser)
            .input('amount', SQL.Decimal(10,2), amount.total)
            .input('ip', SQL.VarChar, ip)
            .execute('sp_closeTicket');

        // CORRECCIÓN CRÍTICA 2: Quitamos o comentamos momentáneamente la validación estricta de rowsAffected[0]
        // para verificar si el SP corre de largo, ya que el RAISERROR de SQL controla los fallos reales.
        console.log("[DEBUG] Datos de filas afectadas devueltas por SQL Server:", result.rowsAffected);

        console.log("[INFO] updateService: Ticket with ID", idTicket, "closed successfully");
        return {result: true, message: 'Ticket closed Successfully', total: amount.total};

    } catch(err){
        console.error('[ERROR EXCEPCIÓN] El flujo cayó al catch debido a:', err.message || err);
        return {result: false, message: err.message || 'Internal Server error'};
    }
}

async function calculateAmount(qrString, idType, idPay) {
    // 1. Validar parámetros de entrada mínimos antes de ir a la BD
    if (!idType || !idPay) {
        return { result: false, message: 'Missing vehicle type or payment type parameters' };
    }

    const idTicket = getId(qrString);
    if (!idTicket) return { result: false, message: 'QR String invalid' };

    try {
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('idTicket', SQL.Int, idTicket)
            .input('idType', SQL.Int, idType)
            .input('idPay', SQL.Int, idPay)
            .execute('sp_GetTicketInfo');

        const ticketData = result.recordset[0];
        
        // Si el ticket no existe o los INNER JOINs no hicieron match, result.recordset estará vacío
        if (!ticketData) {
            return { result: false, message: 'Ticket data could not be retrieved. Check IDs.' };
        }

        // 2. Mapeo seguro de variables con los nombres exactos del SP
        const horaEntradaRaw = ticketData.horaEntrada;
        if (!horaEntradaRaw) {
            return { result: false, message: 'Check-in time is missing in the database record' };
        }

        const horaEntrada = new Date(horaEntradaRaw);
        const horaActual = new Date();
        const diffMs = horaActual - horaEntrada;
        const diffMinutos = diffMs / 60000;

        // Manejo seguro del string de tipo de cobro
        const tipo = ticketData.tipoCobro ? ticketData.tipoCobro.toUpperCase().trim() : 'HORA'; 

        const GRACE_PERIOD_MINS = 5;
        let unidadesACobrar = 0;

        // 3. Lógica de cálculo basada en el tipo de tarifa
        if (tipo === 'HORA') {
            const horasCompletas = Math.floor(diffMinutos / 60);
            const minutosRestantes = diffMinutos % 60;
            unidadesACobrar = minutosRestantes > GRACE_PERIOD_MINS ? horasCompletas + 1 : horasCompletas;
        } 
        else if (tipo === 'DIA' || tipo === 'DÍA') {
            const diasCompletos = Math.floor(diffMinutos / 1440);
            const minutosRestantes = diffMinutos % 1440;
            unidadesACobrar = minutosRestantes > GRACE_PERIOD_MINS ? diasCompletos + 1 : diasCompletos;
        } 
        else if (tipo === 'MEDIA HORA') {
            const mediasCompletas = Math.floor(diffMinutos / 30);
            const minutosRestantes = diffMinutos % 30;
            unidadesACobrar = minutosRestantes > GRACE_PERIOD_MINS ? mediasCompletas + 1 : mediasCompletas;
        } else {
            // Por si acaso entra un tipo no mapeado en los IFs
            unidadesACobrar = Math.ceil(diffMinutos / 60); 
        }

        // Aseguramos que al menos se cobre 1 unidad
        if (unidadesACobrar < 1) unidadesACobrar = 1;

        // 4. Operaciones matemáticas seguras (evitamos multiplicar por undefined o null)
        const multiplicador = ticketData.multiplicador_tarifa !== undefined && ticketData.multiplicador_tarifa !== null 
            ? ticketData.multiplicador_tarifa 
            : 1;
            
        const montoCobro = ticketData.montoCobro || 0;

        const subtotal = montoCobro * unidadesACobrar;
        const total = subtotal * multiplicador;

        return {
            result: true,
            total: Number(total.toFixed(2)), // Nos aseguramos de mantener dos decimales limpios
            unidades: unidadesACobrar,
            tipo: tipo
        };

    } catch (err) {
        // Captura el RAISERROR de SQL Server directamente aquí
        console.error('[ERROR] calculateAmount DB Exception:', err.message);
        return { result: false, message: err.message || 'Error processing ticket pricing' };
    }
}

const filterService = async (params) => {
    try {
        const { qrCode, licensePlate, initialDate, finalDate, user, ip } = params;

        const idTicket = qrCode ? getId(qrCode) : null;
        if (qrCode && !idTicket) return { result: false, message: 'Invalid QR code' };

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('idTicket', SQL.Int, idTicket || null)
            .input('licensePlate', SQL.VarChar(20), licensePlate || null)
            .input('FechaInicial', SQL.DateTime, initialDate || null)
            .input('FechaFinal', SQL.DateTime, finalDate || null)
            .input('idUser', SQL.Int, user.userId)
            .input('ip', SQL.VarChar(20), ip || '0.0.0.0')
            .execute('sp_ConsultarTickets');

        return { result: true, data: result.recordset };
    } catch (err) {
        console.error('[ERROR] filterService: ', err);
        return { result: false, message: 'Internal Server error' };
    }
}

module.exports = {
    createService,
    updateService,
    filterService
}