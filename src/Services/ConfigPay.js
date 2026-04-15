//Servicio para poder guardar la configuracion de pago
import { convertToObject } from 'typescript';
import { pool,sql } from '../config/dbConfig';
import { saveLog } from '../Middlewares/logger';

const createService= async(req, res)=>{
    try{
        const { type, amount, idUser } = req.body;
        
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('type',sql.Varchar, type)
            .input('amount', sql.Decimal,amount)
            .query('INSERT INTO ConfiguracionPago(tipoPago, monto) VALUES (@type, @amount) IF NOT EXISTS (SELECT 1 FROM ConfiguracionPago WHERE tipoPago = @type);');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create payment configuration'};

        //Creamos un log
        await saveLog(idUser, 'CREATE_PAYMENT_CONFIG', `Payment configuration created with type: ${type} and amount: ${amount}`, req.ip);

        console.log("[INFO] createService: Payment configuration created successfully with type:", type, "and amount:", amount);
        return {result: true, message: 'Payment configuration created Succesfully'};
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

const updateService = async(req, res) =>{
    try{
        const { id, amount, idUser }= req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('id',sql.Int,id)
            .input('amount',sql.Decimal,amount)
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