//Codigo para obtener la informacion de un vehiculo
import { pool, sql } from '../config/dbConfig';
import {saveLog} from '../Middlewares/logger';

const getInfo = async (req)=> {
    try{
        const {userId}=req.body;
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('licensePlate',sql.VarChar, licensePlate)
            .query('SELECT * FROM Vehiculo');
        
        if(result.recorset.length === 0) return {result: false, message: 'Info not found'};

        await saveLog(userId, 'GET_VEHICLE_INFO', `Vehicles info retrived`, req.ip);

        console.log('[INFO] getInfo: Vehicle information retrieved successfully');
        return {result: true, message: 'Vehicle information retrieved successfully', data: result.recordset};
    } catch(err){
        console.error('[ERROR] getInfo:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

const getInfoByLicensePlate = async (req) => {
    try{
        const {licensePlate, userId} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('licensePlate',sql.VarChar, licensePlate)
            .query('SELECT * FROM Vehiculo WHERE placa = @licensePlate');
        
        if(result.recordset.length === 0) return {result: false, message: 'Vehicle not found'};

        await saveLog(userId, 'GET_VEHICLE_INFO_BY_PLATE', `Vehicle info retrived for license plate: ${licensePlate}`, req.ip);
        console.log('[INFO] getInfoByLicensePlate: Vehicle information retrieved successfully');
        return {result: true, message: 'Vehicle information retrieved successfully', data: result.recordset[0]};
    } catch(err){
        console.error('[ERROR] getInfoByLicensePlate:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    getInfo,
    getInfoByLicensePlate
}