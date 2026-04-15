const jwt = require('jsonwebtoken');
const { pool, sql } = require('../config/dbConfig');
const bcrypt = require('bcrypt');

//Importamos el logger
import { saveLog } from '../Middlewares/logger';

const authService = async (req,res)=>{
    try{
        const {username, password} = req.body;

        const pool = await PoolPromise;
        const result = await pool.request()
            .input('username',sql.Varchar,username)
            .query('SELECT * FROM Usuarios WHERE username = @username');

        const userInfo = result.recordset[0];

        if(!userInfo) return {result: false, message: 'User not found'};

        const passwordMatch = await bcrypt.compare(password, userInfo.password);
        
        if(!passwordMatch) return {result: false, message: 'Invalid credentials'};

        //Creamos el Payload con la informacion del usuario
        const userPayload = {
            email: email,
            role: 'admin',
            userId: userInfo.idUser
        };

        //Generamos el token con el Payload y la clave secreta
        const token = jwt.sign(userPayload, process.env.SECRET_KEY, {expiresIn: '3h'});

        //Generamos un log
        await saveLog(userPayload.userId, 'LOGIN', `User with email: ${email} logged in successfully`, req.ip);

        console.log("[INFO] authService: User authenticated successfully with email:", email);
        return {result: true, message: 'Authentication successful, token generated', token: token};
    } catch(error){
        console.error('Error in authService:', error);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    authService
}