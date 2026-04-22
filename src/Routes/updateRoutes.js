const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');
const {updateController} = require('../Controllers/TicketController');

//Realizando el UPDATE
router.post('/ticket',authMiddleware,updateController);

module.exports = router;