const express = require('express');
const router = express.Router();
const { authToken, checkRole } = require('../Middlewares/AuthMiddleware');
const { retrieveController } = require('../Controllers/ConsultarController');
const {spaceController} = require('../Controllers/SpaceController');
const {incomeController} = require('../Controllers/IncomeController');
const {todayTicketsController} = require('../Controllers/TodayTicketsController');

// Ruta para consultar catálogos e información - Protegida por rol de admin
router.get('/catalog', authToken, checkRole(['admin']), retrieveController);
router.get('/incomes',authToken,checkRole(['admin']),incomeController);

//Rutas para consultar sin proteccion de admin
router.get('/spaces',authToken,checkRole(['user']),spaceController);
router.get('/tickets',authToken,checkRole(['user']),todayTicketsController);

module.exports = router;
