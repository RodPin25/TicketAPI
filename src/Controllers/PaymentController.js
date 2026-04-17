const configPayService = require('../Services/ConfigPay');

const createController = async(req, res) => {
    try{
        const { idUser, amount, type} = req.body;

        if(!idUser || !amount || !type) return res.status(400).json({message: 'Missing required fields: idUser, amount, type'});

        const result = await configPayService.createService(req, res);

        if(!result.result) return res.status(500).json({message: result.message, details: result.details});

        return res.status(201).json({message: result.message});
    } catch(error){
        console.error('[ERROR] createController:', error,' error generated on the controller layer');
        return res.status(500).json({message: 'Internal Server Error, error generated on the controller layer'});
    }
}

const updateController = async(req, res) => {
    try{
        const { id, amount, idUser } = req.body;

        if(!id || !amount || !idUser) return res.status(400).json({message: 'Missing required fields: id, amount, idUser'});

        const result = await configPayService.updateService(req, res);

        if(!result.result) return res.status(500).json({message: result.message});

        return res.status(200).json({message: result.message});
    } catch(error){
        console.error('[ERROR] updateController:', error,' error generated on the controller layer');
        return res.status(500).json({message: 'Internal Server Error, error generated on the controller layer'});
    }
}

module.exports = {
    createController,
    updateController
}