const carService = require('../Services/CarService');

const carController = async(req, res) => {
    try{
        const { licensePlate, idModel, idUser} = req.body;

        if(!licensePlate || !idModel || !idUser) return res.status(400).json({message: 'Missing required fields: licensePlate, idModel, idUser'});

        const result = await carService.createService(req, res);

        if(!result.result) return res.status(400).json({message: result.message});

        return res.status(201).json({message: result.message});
    } catch(error){
        console.error('[ERROR] carController:', error,' error generated on the controller layer');
        return res.status(500).json({message: 'Internal Server Error, error generated on the controller layer'});
    }
}

module.exports = {
    carController
}