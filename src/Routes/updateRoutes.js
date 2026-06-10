const express = require('express');
const router = express.Router();
const { authToken, checkRole } = require('../Middlewares/AuthMiddleware');
const {updateController: ticketUpdateController} = require('../Controllers/TicketController');
const {updateController: genericUpdateController} = require('../Controllers/UpdateController');
const {updateController: catalogUpdateController} = require('../Controllers/UpdateCatalogController')

//Realizando el UPDATE de Tickets
router.put('/ticket', authToken,checkRole(['user']), ticketUpdateController);

//Realizando UPDATES por admins
router.put('/catalog', authToken,checkRole(['admin']), catalogUpdateController);

//Realizando el UPDATE de Catalogos
router.put('/catalog', authToken, genericUpdateController);

module.exports = router;