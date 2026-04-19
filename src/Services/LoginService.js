const jwt = require('jsonwebtoken');
const { SQL, PoolPromise } = require('../config/db');
const bcrypt = require('bcrypt');
const { saveLog } = require('../Middlewares/logger');

const authService = async (req,res)=>{
    try{
        const {username, password} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('username', SQL.VarChar, username)
            .input('ip', SQL.VarChar, req.ip)
            .execute('sp_LoginService');

        

        const results = result.recordset[0];
        const passwordMatch = await bcrypt.compare(password, results.password);

        //Validamos la informacion de la contrasena
        if(!passwordMatch) return {result: false, message: 'Authentication failed, incorrect password'};

        //Creamos el Payload con la informacion del usuario
        const userPayload = {
            email: results.email,
            role: 'admin',
            userId: results.idUser
        };

        //Generamos el token con el Payload y la clave secreta
        const token = jwt.sign(userPayload, process.env.SECRET_KEY, {expiresIn: '3h'});

        //Generamos un log
        await saveLog(userPayload.userId, 'LOGIN', `User with email: ${results.email} logged in successfully`, req.ip);

        console.log("[INFO] authService: User authenticated successfully with email:", results.email);
        return {result: true, message: 'Authentication successful, token generated', token: token};
    } catch(error){
        console.error('Error in authService:', error);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    authService
}