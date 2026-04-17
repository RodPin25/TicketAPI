const brandService = require('../Services/BrandService');

const brandController = async (req, res) => {
    try{
        const { name, description, idUser } = req.body;

        if(!name || !description || !idUser) {
            return res.status(400).json({message: 'Missing required fields: name, description, idUser'});
        }

        const result = await brandService.createBrandService(req, res);

        if(!result.result) return res.status(400).json({message: result.message});

        return res.status(201).json(result);
    } catch(error){
        console.error('[ERROR] brandController:', error,' error generated on the controller layer');
        return res.status(500).json({message: 'Internal Server Error, error generated on the controller layer'});
    }
}

module.exports = {
    brandController
}