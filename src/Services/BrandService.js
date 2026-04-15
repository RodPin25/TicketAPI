//Servicio para crear Marcas
import { pool,sql } from '../config/dbConfig';
import { saveLog } from '../Middlewares/logger';

const createBrandService = async (req, res) =>{
    try{
        const {name,description,idUser} = req.body;
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('name',sql.Varchar,name)
            .input('description',sql.Varchar,description)
            .query('INSERT INTO Marca(nombreMarca,descripcionMarca) VALUES (@name,@description) IF NOT EXISTS (SELECT 1 FROM Marca WHERE nombreMarca = @name);');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create brand'};

        //Creamos un Log para auditoria
        await saveLog(idUser, 'CREATE_BRAND', `Brand created with name: ${name}`, req.ip);

        console.log("[INFO] createBrandService: Brand created successfully with name:", name);
        return {result: true, message: 'Brand created Succesfully'};
        
    } catch(err){
        console.error('[ERROR] createBrandService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports ={
    createBrandService
}