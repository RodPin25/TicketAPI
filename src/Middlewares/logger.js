//Archivo para generar Logs
const {pool, sql} = require('../config/dbConfig');

const saveLog = async (idUser, action, description, ip) => {
    try{
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('idUser',sql.Int, idUser)
            .input('action',sql.Varchar,action)
            .input('description',sql.Varchar,description)
            .input('ip',sql.Varchar,ip)
            .query('INSERT INTO Logs(idUser,accion,descripcion,ip_origen) VALUES (@idUser,@action,@description,@ip);');

        if(!result.rowsAffected[0]) {
            console.error('[ERROR] saveLog: Failed to save log for user ID:', idUser);
            return {result: false, message: 'Failed to save log'};
        }

        console.log('[INFO] saveLog: Log saved successfully for user ID:', idUser, 'Action:', action);
    } catch(err){
        console.error('[ERROR] saveLog:', err);
    }
}