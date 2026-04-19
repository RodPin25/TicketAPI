// Servicio para poder guardar los carros
const { SQL, PoolPromise } = require('../config/db');

const createService = async(req, res)=> {
    try{
        const {licensePlate, idModel, idUser} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('licensePlate', SQL.VarChar, licensePlate)
            .input('idModel', SQL.Int, idModel)
            .input('idUser', SQL.Int, idUser)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_InsertCar');

        

        console.log('[INFO] createService: Car created successfully with license plate:', licensePlate);
        return {result: true, message: 'Car created successfully'};

    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

//Aqui iria la logica para obtener la informacion de un vehiculo, pero aun no se ha implementado.

module.exports = {
    createService
}