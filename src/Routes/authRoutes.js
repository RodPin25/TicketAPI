const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/LoginController');

//Comenzando las rutas

//Ruta para el login
router.post('/login', loginController);

//Exportamos el router para usarlo en app.js
module.exports = router;