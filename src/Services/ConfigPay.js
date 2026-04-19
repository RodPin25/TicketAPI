//Servicio para poder guardar la configuracion de pago
const { SQL, PoolPromise } = require('../config/db');
const { saveLog } = require('../Middlewares/logger');

const createService= async(req, res)=>{
    try{
        const { type, amount, idUser } = req.body;
        
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('type', SQL.VarChar, type)
            .input('amount', SQL.Decimal, amount)
            .input('idUser', SQL.Int, idUser)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_InsertConfigPayment');

        

        console.log('[INFO] createService: Payment configuration created successfully with type:', type, 'and amount:', amount);
        return {result: true, message: 'Payment configuration created successfully'};

    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, 
            message: 'Internal Server error, error Generated on the Service Layer',
            details: err.message
        };
    }
}

const updateService = async(req, res) =>{
    try{
        const { id, amount, idUser }= req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('id', SQL.Int, id)
            .input('amount', SQL.Decimal, amount)
            .query('UPDATE ConfiguracionCobro SET monto = @amount WHERE idTipoCobro = @id;');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to update payment configuration'};

        //Creamos un log
        await saveLog(idUser, 'UPDATE_PAYMENT_CONFIG', `Payment configuration with id: ${id} updated to amount: ${amount}`, req.ip);

        console.log("[INFO] updateService: Payment configuration updated successfully with id:", id, "and new amount:", amount);
        return {result: true, message: 'Payment configuration updated Succesfully'};

    } catch(err){
        console.error('[ERROR] updateService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    createService,
    updateService
}