const typeService = require('../Services/TypeService');

const createController = async (req, res)=>{
    try{
        const { name, idUser } = req.body;

        if(!name || !idUser) {
            return res.status(400).json({result: false, message: 'Name and idUser are required'});
        }

        const serviceResult = await typeService.createService(req, res);

        if(!serviceResult.result) {
            return res.status(500).json({result: false, message: serviceResult.message, details: serviceResult.details});
        }
        return res.status(201).json({result: true, message: serviceResult.message});
    } catch(err){
        console.error('[ERROR] Failed to create type:', err);
        return res.status(500).json({result: false, message: 'Internal Server error, error Generated on the Controller Layer'});
    }
}

const getAllTypesController = async (req, res) => {
    try {
        const result = await typeService.getAllTypesService();
        if (!result.result) return res.status(500).json(result);
        return res.status(200).json(result);
    } catch (err) {
        console.error('[ERROR] getAllTypesController:', err);
        return res.status(500).json({ result: false, message: 'Internal Server error' });
    }
}

module.exports = {
    createController,
    getAllTypesController
}