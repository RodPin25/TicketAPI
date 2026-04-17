const express = require('express');
const router = express.Router();
const { authController } = require('../Controllers/LoginController');

//Comenzando las rutas

//Ruta para el login
router.post('/login', authController);

//Exportamos el router para usarlo en app.js
module.exports = router;