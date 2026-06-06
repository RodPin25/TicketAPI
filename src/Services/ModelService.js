//Servicio para crear modelos de vehiculos
const { SQL, PoolPromise } = require('../config/db');


const createModelService = async (req, res) => {
    try{
        const {name, idBrand, idType} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('name', SQL.VarChar, name)
            .input('idBrand', SQL.Int, idBrand)
            .input('idType', SQL.Int, idType)
            .input('idUser', SQL.Int, req.user.userId)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_ModelService');

        

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
