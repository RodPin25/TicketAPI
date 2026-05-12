const {SQL, PoolPromise} = require('../config/db');

const retrieveService = async (req)=>{
    //Vamos a consultar toda la informacion de la base de datos.
    try{
        const {table, id, licensePlate} = req.query;

        console.log(`Table: ${table}, Id: ${id}, License: ${licensePlate}`);

        const pool= await PoolPromise;
        const result = await pool.request()
            .input('Tabla', SQL.VarChar(20), table)
            .input('Id', SQL.Int, (id && id !== "") ? id : null)
            .input('Placa', SQL.VarChar(15), (licensePlate && licensePlate !== "") ? licensePlate : null)
            .execute('sp_ConsultarCatalogos');
        
        console.log('[INFO] Se ha recivido informacion desde la base de datos');
        console.log(result);
        return {result:true, message:'Info recibed succesfully', data: result.recordset[0]}
    } catch(err){
        console.error('[ERROR] ', err.message);
        return{ result: false, message: err.message };
    }
}

module.exports = {retrieveService}