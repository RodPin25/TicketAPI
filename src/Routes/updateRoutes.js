const express = require('express');
const router = express.Router();
const { authToken } = require('../Middlewares/AuthMiddleware');
const {updateController: ticketUpdateController} = require('../Controllers/TicketController');
const {updateController: genericUpdateController} = require('../Controllers/UpdateController');

//Realizando el UPDATE de Tickets
router.put('/ticket', authToken, ticketUpdateController);

//Realizando el UPDATE de Catalogos
router.put('/catalog', authToken, genericUpdateController);

module.exports = router;