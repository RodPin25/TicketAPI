const {SQL, PoolPromise} = require('../config/db');

const retrieveService = async (req)=>{
    //Vamos a consultar toda la informacion de la base de datos.
    try{
        const {table, id, license} = req.body;

        const pool= await PoolPromise;
        const result = await pool.request()
            .input('Tabla',SQL.VarChar(20),table)
            .input('Id', SQL.Int,id)
            .input('Placa',SQL.VarChar(15),license)
            .execute('sp_ConsultarCatalogos');
        
        console.log('[INFO] Se ha recivido informacion desde la base de datos');
        return {result:true, message:'Info recibed succesfully', data: result.recordset[0]}
    } catch(err){
        console.error('[ERROR] ', err.message);
        return{ result: false, message: err.message };
    }
}

module.exports = {retrieveService}