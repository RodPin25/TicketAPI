const { SQL, pool } = require('../config/db'); // Asegúrate de usar 'pool' o 'PoolPromise' según tu export
const bcrypt = require('bcrypt');

const createService = async (req) => { // Quitamos res porque esto es un service, no un controller
    try {
        const { username, password1, password2, ip } = req.body;

        // 1. Validación de contraseñas
        if (password1 !== password2) {
            return { result: false, message: "Passwords don't match" };
        }

        // 2. Hashing (Versión simplificada y async)
        // Usamos saltRounds desde env o por defecto 10
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashed = await bcrypt.hash(password1, saltRounds);

        // 3. Conexión y ejecución del SP
        const request = await pool; // Usando la lógica que ya probamos antes
        const result = await request.request()
            .input('username', SQL.VarChar(50), username)
            .input('password', SQL.VarChar(255), hashed)
            .input('type', SQL.Int, 1)
            .input('ip', SQL.VarChar(50), ip)
            .execute('sp_SignUpService');

        if (result.rowsAffected[0] > 0) {
            console.log("[INFO] New User created successfully");
            return { result: true, message: "User has been created" };
        } else {
            return { result: false, message: "No rows affected in database" };
        }

    } catch (err) {
        // Capturamos si el SP lanza un RAISERROR (ej. usuario ya existe)
        console.error(`[ERROR] createService: ${err.message}`);
        return { result: false, message: err.message || 'Internal server error' };
    }
}

module.exports = { createService };