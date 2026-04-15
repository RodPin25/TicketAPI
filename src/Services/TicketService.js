//Servicio para los tickets
import { pool,sql } from '../config/dbConfig';
import { saveLog } from '../Middlewares/logger';

const createService = async(req, res)=>{
    try{
        const { licensePlate, idPay, idUser } = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('licensePlate',sql.Varchar,licensePlate)
            .input('idPay',sql.Int,idPay)
            .input('idUser',sql.Int,idUser)
            .query('INSER INTO Tickets(pagado, idUser, placaVehiculo,idTipoCobro) VALUES(0,@idUser,@licensePlate,@idPay);');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create ticket'};

        //Creamos un log
        await saveLog(idUser, 'CREATE_TICKET',`Ticket created for a car with license plate: ${licensePlate}`, req.ip);

        console.log("[INFO] createService: Ticket created successfully for car with license plate:", licensePlate);
        return {result: true, message: 'Ticket created Succesfully'};
        
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}