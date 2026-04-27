const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');
const {updateController: ticketUpdateController} = require('../Controllers/TicketController');
const {updateController: genericUpdateController} = require('../Controllers/UpdateController');

//Realizando el UPDATE de Tickets
router.post('/ticket',authMiddleware,ticketUpdateController);

//Realizando el UPDATE de Catalogos
router.post('/catalog',authMiddleware,genericUpdateController);

module.exports = router;