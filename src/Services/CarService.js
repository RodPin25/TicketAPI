// Servicio para poder guardar los carros
import { pool,sql } from '../config/dbConfig';
import { saveLog } from '../Middlewares/logger';

const createService = async(req, res)=> {
    try{
        const {licensePlate, idModel, idUser} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('licensePlate',sql.Varchar,licensePlate)
            .input('idModelo',sql.Int,idModel)
            .query('INSERT INTO Vehiculos(placaVehiculo, idModelo) VALUES (@licensePlate, @idModelo) IF NOT EXISTS (SELECT 1 FROM Vehiculos WHERE placaVehiculo = @licensePlate);');
        
        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create car'};

        //Creamos un Log
        await saveLog(idUser,'CREATE_CAR',`Car created with license plate: ${licensePlate}`, req.ip);
        
        console.log("[INFO] createService: Car created successfully with license plate:", licensePlate);
        return {result: true, message: 'Car created Succesfully'};
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    createService
}