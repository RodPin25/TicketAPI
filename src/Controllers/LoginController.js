const loginService = require('../Services/LoginService');

const authController = (req, res)=>{
    try{
        const {email, password} = req.body;
        const emailRegex=process.env.EMAIL_REGEX;
        const passwordRegex=process.env.PASSWORD_REGEX;

        //Validamos con expresiones regulares el formato del email y la contraseña
        if(!emailRegex.test(email)){
            return res.status(400).json({message: 'Invalid email format'});
        }

        if(!passwordRegex.test(password)){
            return res.status(400).json({message: 'Invalid password format'});
        }
        
        //Hacemos uso del service para autenticar al usuario
        //loginService.authService(req, res);

    } catch(error){
        console.error('Error in authController:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}