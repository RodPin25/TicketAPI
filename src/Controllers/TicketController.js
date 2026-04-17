const ticketService = require('../Services/TicketService');

const createController = async (req, res)=>{
    try{
        const { licensePlate, idPay, idUser } = req.body;

        if(!licensePlate || !idPay || !idUser) return res.status(400).json({result: false, message: 'Missing required fields'});

        const result = await ticketService.createService(req, res);
        if(!result.result) return res.status(500).json(result);

        return res.status(201).json(result);
    } catch(err){
        console.error('[ERROR] Failed to create ticket:', err);
        return res.status(500).json({result: false, message: 'Internal Server error, error Generated on the Controller Layer'});
    }
}

const updateController = async (req, res)=>{
    try{
        const { idTicket, idUser } = req.body;

        if(!idTicket || !idUser) return res.status(400).json({result: false, message: 'Missing required fields'});

        const result = await ticketService.updateService(req, res);
        if(!result.result) return res.status(500).json(result);

        return res.status(200).json(result);
    } catch(err){
        console.error('[ERROR] Failed to close ticket:', err);
        return res.status(500).json({result: false, message: 'Internal Server error, error Generated on the Controller Layer'});
    }
}

module.exports={
    createController,
    updateController
}