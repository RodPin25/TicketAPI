const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware'); // Corregido nombre de carpeta y archivo

//Importar las funciones específicas de los controladores
const { brandController } = require('../Controllers/BrandController');
const { carController } = require('../Controllers/CarController');
const { modelController } = require('../Controllers/ModelController');
const { createController: paymentCreateController, updateController: paymentUpdateController } = require('../Controllers/PaymentController');
const { createController: ticketCreateController, updateController: ticketUpdateController } = require('../Controllers/TicketController');
const { createController: typeCreateController } = require('../Controllers/TypeController');

//Crear las rutas
// 1. Ruta para insertar una marca
router.post('/brands', authMiddleware, brandController);

// 2. Ruta para insertar un carro
router.post('/cars', authMiddleware, carController);

// 3. Ruta para insertar un modelo
router.post('/models', authMiddleware, modelController);

// 4. Rutas para configuración de pago
router.post('/payments', authMiddleware, paymentCreateController);
router.put('/payments', authMiddleware, paymentUpdateController);

// 5. Rutas para tickets
router.post('/tickets', authMiddleware, ticketCreateController);

// 6. Ruta para tipos de vehículos
router.post('/types', authMiddleware, typeCreateController);

module.exports = router;
