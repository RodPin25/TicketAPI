const {SQL, PoolPromise} = require('../config/db');

const spaceService = async (req) =>{
    try{
        const {idParqueo} = req.query;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('idParqueo',SQL.Int, idParqueo)
            .execute('sp_EspaciosParqueo');
        
        const data = result.recordset[0];

        console.log('[INFO] Information retrieved from the parking spaces available');
        return {result:true,data:data,message:'Info from spaces available retrieved'};
    } catch(err){
        console.error('[ERROR] ',err.message);
        return{result:false, message:err.message};
    }
}

module.exports = {spaceService}