//Servicio para crear modelos de vehiculos
import { pool,sql } from '../config/dbConfig';
import { saveLog } from '../Middlewares/logger';

const createModelService = async (req, res) => {
    try{
        const {name, description, idBrand, idType, idUser} = req.body;

        const pool= PoolPromise;
        const result = await pool.request()
            .input('name',sql.Varchar,name)
            .input('description',sql.Varchar,description)
            .input('idBrand',sql.Int,idBrand)
            .input('idType',sql.Int,idType)
            .query('INSERT INTO Modelos(nombreModelo,descripcionModelo,idMarca,idTipo) VALUES (@name,@description,@idBrand,@idType) IF NOT EXISTS (SELECT 1 FROM Modelos WHERE nombreModelo = @name);');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create model'};

        //Creamos un Log para auditoria
        await saveLog(idUser,'CREATE_MODEL',`Model created with name: ${name} by user with ID: ${idUser}`, req.ip);

        console.log("[INFO] createModelService: Model created successfully with name:", name);
        return {result: true, message: 'Model created Succesfully'};
    } catch(err){
        console.error('[ERROR] Failed to create model:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    createModelService
}
