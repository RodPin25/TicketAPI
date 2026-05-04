const express = require('express');
const router = express.Router();
const { authToken } = require('../Middlewares/AuthMiddleware'); // Corregido nombre de carpeta y archivo

//Importar las funciones específicas de los controladores
const { brandController } = require('../Controllers/BrandController');
const { carController } = require('../Controllers/CarController');
const { modelController } = require('../Controllers/ModelController');
const { createController: paymentCreateController, updateController: paymentUpdateController } = require('../Controllers/PaymentController');
const { createController: ticketCreateController, updateController: ticketUpdateController } = require('../Controllers/TicketController');
const { createController: typeCreateController } = require('../Controllers/TypeController');

//Crear las rutas
// 1. Ruta para insertar una marca
router.post('/brands', authToken, brandController);

// 2. Ruta para insertar un carro
router.post('/cars', authToken, carController);

// 3. Ruta para insertar un modelo
router.post('/models', authToken, modelController);

// 4. Rutas para configuración de pago
router.post('/payments', authToken, paymentCreateController);
router.put('/payments', authToken, paymentUpdateController);

// 5. Rutas para tickets
router.post('/tickets', authToken, ticketCreateController);

// 6. Ruta para tipos de vehículos
router.post('/types', authToken, typeCreateController);

module.exports = router;
