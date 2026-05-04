const express = require('express');
const router = express.Router();
const { authToken, checkRole } = require('../Middlewares/AuthMiddleware');
const { retrieveController } = require('../Controllers/ConsultarController');

// Ruta para consultar catálogos e información - Protegida por rol de admin
router.get('/catalog', authToken, checkRole(['admin']), retrieveController);

module.exports = router;
