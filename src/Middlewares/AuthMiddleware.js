const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    try {
        //Obtenemos la informacion del token del header de autorizacion
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        //Validamos si el token existe, si no existe retornamos un error de acceso denegado
        if (!token) {
            return res.status(401).json({message: 'Access denied, no token provided'});
        }

        //Validamos el token con la clave secreta, si es valido, agregamos la informacion del usuario al request y continuamos con el siguiente middleware o controlador
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            //Si no verifica el token retornamos un error de acceso no autorizado
            if (err) {
                return res.status(403).json({message: 'Unauthorized, invalid token'});
            }

            //Si valida el token retornamos el usuario. Agregamos la informacion del usuario al request para que pueda ser utilizada en los siguientes middlewares o controladores
            req.user = user;

            //Avanzamos con la siguiente funcion en la cadena de middlewares o el controlador
            next();
        });
    } catch (err) {
        console.error('Error in authToken middleware:', err);
        res.status(500).json({message: 'Internal server error, generated on the auth Middleware layer'});
    }
};

/**
 * Middleware para verificar si el usuario tiene los roles necesarios.
 * @param {Array<string>} roles - Lista de roles permitidos.
 */
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied: insufficient permissions. Required roles: [${roles.join(', ')}]` 
            });
        }

        next();
    };
};

module.exports = {
    authToken,
    checkRole
};