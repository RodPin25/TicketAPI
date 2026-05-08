const express = require('express');
const router = express.Router();
const { authController } = require('../Controllers/LoginController');
const { createController } = require('../Controllers/SignUpController');
const { authToken, returnUser } = require('../Middlewares/AuthMiddleware');

//Comenzando las rutas

//Ruta para el login
router.post('/login', authController);
router.post('/signup',createController);
router.get('/user', authToken, returnUser);

//Exportamos el router para usarlo en app.js
module.exports = router;