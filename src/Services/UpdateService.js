const {SQL, PoolPromise} = require('../config/db');

const updateService = async (req,res) =>{
    //servicio para actualizar catagolos
    try{
        const {Tabla, Id, Placa, Nombre, Descripcion, Estado, ip, Password, idUserEjecutor} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('Tabla',SQL.VarChar(20),Tabla)
            .input('Id',SQL.Int,Id)
            .input('Placa',SQL.VarChar(15),Placa)
            .input('Nombre',SQL.VarChar(100),Nombre)
            .input('Descripcion',SQL.VarChar(255),Descripcion)
            .input('Estado',SQL.Int, Estado)
            .input('ip',SQL.VarChar(50),ip)
            .input('Password',SQL.VarChar(100))
            .input('idUserEjecutor',SQL.Int,idUserEjecutor)
            .execute('sp_MantenimientoCatalogos');
        
        console.log('[INFO] Catalogo actualizado correctamente');
        return {result:true, message:'Registers updated succesfully'}

    } catch(err){
        console.error('[ERROR] ',err.message);
        return {result: false, message: err.message};
    }
    
}

module.exports = {
    updateService
}