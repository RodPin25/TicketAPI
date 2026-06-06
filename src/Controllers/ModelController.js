const modelService = require('../Services/ModelService');

const modelController = async (req, res)=>{
    try{
        const {name, idBrand, idType} = req.body;

        console.log(`===== Informacion recibida en el modelController =====`);
        console.log(`name: ${name}`);
        console.log(`idBrand: ${idBrand}`);
        console.log(`idType: ${idType}`);

        if(!name || !idBrand || !idType ) return res.status(400).json({result: false, message: 'Missing required fields'});

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