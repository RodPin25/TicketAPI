//Servicio para crear modelos de vehiculos
const { SQL, PoolPromise } = require('../config/db');


const createModelService = async (req, res) => {
    try{
        const {name, description, idBrand, idType, idUser} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('name', SQL.VarChar, name)
            .input('description', SQL.VarChar, description)
            .input('idBrand', SQL.Int, idBrand)
            .input('idType', SQL.Int, idType)
            .input('idUser', SQL.Int, idUser)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_ModelService');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create model'};

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
