const {SQL, PoolPromise} = require('../config/db');

const incomeService = async () =>{
    // Este service es sencillo, solo hacemos un llamado al sp
    try{
        const pool = await PoolPromise;
        const result = await pool.request()
            .execute('sp_ObtenerIngresos');

        const data =  result.recordset[0];
        console.log('[INFO] Incomes retrieved from database');
        return {result:true, message:'Incomes retrieved from database succesfully',data:data};
    } catch(err){
        console.error('[ERROR] ',err.message);
        return {result:false, message:err.message};
    }
}

module.exports = {incomeService}