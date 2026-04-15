//Codigo para obtener la informacion y retornar la informacion del tipo cobro de la base de datos.
import { pool,sql } from '../config/dbConfig';
import {saveLog} from '../Middlewares/logger';

const getInfoService = async(req, res)=>{
    try{
        const pool = await PoolPromise;
        const result = await pool.request()
            .query('SELECT * FROM ConfiguracionCobro;');

        if(!result.recordset.length) return {result: false, message: 'No payment configuration found'};

        //Creamos un log
        await saveLog(null, 'GET_PAYMENT_CONFIG', 'Payment configuration retrieved', req.ip);

        console.log("[INFO] getInfoService: Payment configuration retrieved successfully"); 
        return {result: true, data: result.recordset};
    } catch(err){
        console.error('[ERROR] getInfoService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    getInfoService
}