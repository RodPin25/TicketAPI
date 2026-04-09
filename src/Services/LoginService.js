const jwt = require('jsonwebtoken');

const authService = (req,res)=>{
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
}

module.exports = {
    authService
}