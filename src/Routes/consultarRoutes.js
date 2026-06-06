const express = require('express');
const router = express.Router();
const { authToken, checkRole } = require('../Middlewares/AuthMiddleware');
const { retrieveController } = require('../Controllers/ConsultarController');
const {spaceController} = require('../Controllers/SpaceController');
const {incomeController} = require('../Controllers/IncomeController');
const {todayTicketsController} = require('../Controllers/TodayTicketsController');
const { getAllTypesController } = require('../Controllers/TypeController');
const { getAllConfigsController } = require('../Controllers/PaymentController');
const { filterController, amountController } = require('../Controllers/TicketController');

// Ruta para consultar catálogos e información - Protegida por rol de admin
router.get('/catalog', authToken, checkRole(['user']), retrieveController);
router.get('/incomes',authToken,checkRole(['admin']),incomeController);

//Rutas para consultar sin proteccion de admin
router.get('/spaces',authToken,checkRole(['user']),spaceController);
router.get('/tickets',authToken,checkRole(['user']),todayTicketsController);
router.get('/filter',authToken,checkRole(['user']),filterController);
router.get('/amount',authToken,checkRole(['user']),amountController);

// Rutas para listados simples (frontend dropdowns)
router.get('/types', authToken, getAllTypesController);
router.get('/payments', authToken, getAllConfigsController);

module.exports = router;
