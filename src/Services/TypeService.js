//Servicio para poder guardar los tipos de vehiculos
const { SQL, PoolPromise } = require('../Config/db');


const createService= async(req, res)=>{
    try{
        const {name,idUser} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('name', SQL.VarChar, name)
            .input('idUser', SQL.Int, idUser)
            .execute('sp_TypeService');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create type'};

        console.log("[INFO] createService: Type created successfully with name:", name);
        return {result: true, message: 'Type created Succesfully'};
    } catch(err){
        console.error('[ERROR] createService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer', details: err.message};
    }

}

module.exports = {
    createService
}