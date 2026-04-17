//Servicio para crear Marcas
const { SQL, PoolPromise } = require('../config/db');


const createBrandService = async (req, res) =>{
    try{
        const {name,description,idUser} = req.body;
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('nombreMarca', SQL.VarChar, name)
            .input('descripcionMarca', SQL.VarChar, description)
            .input('idUser', SQL.Int, idUser)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_InsertBrand');

        if(!result.rowsAffected[0]) return {result: false, message: 'Failed to create brand'};

        //Ya no creamos un log si no mas bien lo hacemos dentro del SP para optimizar el proceso

        console.log("[INFO] createBrandService: Brand created successfully with name:", name);
        return {result: true, message: 'Brand created Succesfully'};
        
    } catch(err){
        console.error('[ERROR] createBrandService:', err);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

//Aqui iria la logica para obtener la informacion de las marcas


module.exports ={
    createBrandService
}