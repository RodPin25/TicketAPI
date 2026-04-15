//Servicio para poder guardar los tipos de vehiculos
import { pool,sql } from '../config/dbConfig';
import { saveLog } from '../Middlewares/logger';

const createService= async(req, res)=>{
    try{
        const {name,status,idUser} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('name',sql.Varchar,name)
            .input('status',sql.Int,status)
            .query('INSERT INTO TipoVehiculo(nombreTipo,statusTipo) VALUES (@name,@status) IF NOT EXISTS (SELECT 1 FROM TipoVehiculo WHERE nombreTipo = @name);');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create type'};

        //Creamos un LOG
        await saveLog(idUser, 'CREATE_TYPE','Type created with name: ${name}', req.ip);

        console.log("[INFO] createService: Type created successfully with name:", name);
        return {result: true, message: 'Type created Succesfully'};
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }

}

module.exports = {
    createService
}