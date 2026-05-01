const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');
const { retrieveController } = require('../Controllers/ConsultarController');

// Ruta para consultar catálogos e información
router.get('/catalog', authMiddleware, retrieveController);

module.exports = router;
