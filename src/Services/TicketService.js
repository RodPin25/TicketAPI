//Servicio para los tickets
const { SQL, PoolPromise } = require('../Config/db');
const { saveLog } = require('../Middlewares/logger');

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

        //Creamos un log
        await saveLog(idUser, 'CREATE_TICKET',`Ticket created for a car with license plate: ${licensePlate}`, req.ip);

        console.log("[INFO] createService: Ticket created successfully for car with license plate:", licensePlate);
        return {result: true, message: 'Ticket created Succesfully'};
        
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    createService
}