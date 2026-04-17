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

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create ticket'};

        console.log("[INFO] createService: Ticket created successfully for car with license plate:", licensePlate);
        return {result: true, message: 'Ticket created Succesfully'};
        
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

const updateService = async(req, res)=>{
    try{
        const { idTicket, idUser, ip } = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('idTicket',SQL.Int, idTicket)
            .input('idUser', SQL.Int, idUser)
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

module.exports = {
    createService,
    updateService
}