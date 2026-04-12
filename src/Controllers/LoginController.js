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
        const authResult = loginService.authService(req,res);
        if(authResult.result){
            res.status(200).json({message: authResult.message, token:authResult.token})
        } else {
            res.status(401).json({message: authResult.message});
        }

    } catch(error){
        console.error('Error in authController:', error);
        res.status(500).json({message: 'Internal server error, generated on the Controller Layer'});
    }
}