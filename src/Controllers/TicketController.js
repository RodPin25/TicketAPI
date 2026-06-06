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
        console.log("Utilizando controlador de la actualizacion del ticket");
        const { qrString, idType, idPay } = req.body;

        if(!qrString || !idType || !idPay) {
            return res.status(400).json({result: false, message: 'Missing required fields (qrString, idUser, idPay, idType)'});
        }

        const result = await ticketService.updateService(req, res);
        if(!result.result) return res.status(500).json(result);

        console.log("Ticket actualizado exitosamente");
        return res.status(200).json(result);
    } catch(err){
        console.error('[ERROR] Failed to close ticket:', err);
        return res.status(500).json({result: false, message: 'Internal Server error, error Generated on the Controller Layer'});
    }
}

const filterController = async (req, res) => {
    try {
        // Obtenemos los filtros desde req.query (ej: /api/tickets?licensePlate=ABC-123)
        const { qrCode, licensePlate, initialDate, finalDate } = req.query;

        // Pasamos el objeto de filtros al servicio
        const result = await ticketService.filterService({ 
            qrCode, 
            licensePlate, 
            initialDate, 
            finalDate,
            user: req.user,
            ip: req.ip
        });

        if (!result.result) {
            return res.status(400).json(result);
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error('[ERROR] Filter controller: ', err.message);
        return res.status(500).json({ 
            result: false, 
            message: 'Internal Server error' 
        });
    }
}

module.exports={
    createController,
    updateController,
    filterController
}