const modelService = require('../Services/ModelService');

const modelController = async (req, res)=>{
    try{
        const {name, description, idBrand, idType, idUser} = req.body;

        if(!name || !description || !idBrand || !idType || !idUser) return res.status(400).json({result: false, message: 'Missing required fields'});

        const result = await modelService.createModelService(req, res);
        if(!result.result) return res.status(500).json(result);

        return res.status(201).json(result);
    } catch(err){
        console.error('[ERROR] Failed to create model:', err);
        return res.status(500).json({result: false, message: 'Internal Server error, error Generated on the Controller Layer'});
    }
}

module.exports = {
    modelController
}