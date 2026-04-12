const jwt = require('jsonwebtoken');

const authService = (req,res)=>{
    try{
        const {email, password} = req.body;

        //Logica provisional para login
        if(email === 'admin@example.com' && password === 'password'){
            
            //Creamos el Payload con la informacion del usuario
            const userPayload = {
            email: email,
            role: 'admin'
            };

            //Generamos el token con el Payload y la clave secreta
            const token = jwt.sign(userPayload, process.env.SECRET_KEY, {expiresIn: '3h'});
            return {result: true, message: 'Authentication successful, token generated', token: token};
        } else {
            return {result: false, message: 'Invalid credentials'};
        }
    } catch(error){
        console.error('Error in authService:', error);
        return {result: false, message: 'Internal Server error, error Generated on the Service Layer'};
    }
}

module.exports = {
    authService
}