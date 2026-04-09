const jwt = require('jsonwebtoken');

const authService = (req,res)=>{
    try{
        const {username, password} = req.body;

        //Logica provisional para login
        if(username === 'admin' && password === 'password'){
            
            //Creamos el Payload con la informacion del usuario
            const userPayload = {
            username: username,
            role: 'admin'
        }

        //Generamos el token con el Payload y la clave secreta
        const token = jwt.sign(userPayload, process.env.SECRET_KEY, {expiresIn: '3h'});
        res.json({token});
        }
    } catch(error){
        console.error('Error in authService:', error);
        res.json({error: 'Internal Server error, error Generated on the Service Layer'});
    }
}

module.exports = {
    authService
}