const loginService = require('../Services/LoginService');

const authController = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Obtenemos los regex de las variables de entorno o usamos valores por defecto      
        const usernameRegex = new RegExp(process.env.USERNAME_REGEX);
        const passwordRegex = new RegExp(process.env.PASSWORD_REGEX || '^.{6,}$');

        // Validamos con expresiones regulares (si se desea validar el username como email)  
        if (username && !usernameRegex.test(username)) {
            return res.status(400).json({message: 'Invalid username format'});
        }
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Hacemos uso del service para autenticar al usuario (con await)
        const authResult = await loginService.authService(req, res);
        
        if (authResult.result) {
            return res.status(200).json({ message: authResult.message, token: authResult.token });
        } else {
            return res.status(401).json({ message: authResult.message });
        }

    } catch (error) {
        console.error('Error in authController:', error);
        return res.status(500).json({ message: 'Internal server error, generated on the Controller Layer' });
    }
};

module.exports = {
    authController
};