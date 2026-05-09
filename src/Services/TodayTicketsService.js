const {SQL, PoolPromise} = require('../config/db');

const todayTickets = async (idUser, ipCliente) =>{
    try{
        const pool= await PoolPromise;
        const result = await pool.request()
            .input('idUser',SQL.Int,idUser)
            .input('ip',SQL.VarChar(50),ipCliente)
            .execute('sp_ObtenerTicketsHoy');

        const data = result.recordset[0];
        if(!data) return {result:false, message:'No information retrieved'};

        console.log('[INFO] Information of today tickets has been retrieved');
        return {result:true, message:'Information of today tickets has been retrieved', data: data}
    } catch(err){
        console.error('[ERROR] ',err.message);
        return {result: false,message:err.message};
    }
}

module.exports = {todayTickets}