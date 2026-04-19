const { createService } = require('../Services/SignUpService');

const createController = async (req, res) => {
    try {
        // 1. Extraemos los datos para validar (Asegúrate que coincidan con el Body de Thunder Client)
        const { username, password1 } = req.body; 

        // 2. Cargamos las RegEx (con el nombre correcto: process)
        const usernameRegex = new RegExp(process.env.USERNAME_REGEX);
        const passwordRegex = new RegExp(process.env.PASSWORD_REGEX);

        // 3. Validaciones de formato
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Invalid username format" });
        }

        if (!passwordRegex.test(password1)) {
            return res.status(400).json({ message: "Invalid password format" });
        }

        // 4. ¡EL AWAIT ES CLAVE AQUÍ!
        const signUpResult = await createService(req);

        // 5. Respuesta basada en el resultado del servicio
        if (signUpResult.result) {
            return res.status(201).json({ message: signUpResult.message });
        } else {
            // Usamos 400 (Bad Request) o 409 (Conflict) si el usuario ya existe
            return res.status(400).json({ message: signUpResult.message });
        }

    } catch (err) {
        console.error(`[ERROR] Controller: ${err.message}`);
        return res.status(500).json({ message: "Internal server error in controller" });
    }
}

module.exports = { createController };