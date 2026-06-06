const brandService = require('../Services/BrandService');

const brandController = async (req, res) => {
    try{
        const { name, description } = req.body;

        console.log("=== Variables de entrada BrandService ===");
        console.log(`name: ${name ? req.body.name : 'No name provided'}`);
        console.log(`Description: ${description}`);
        console.log(`idUser: ${req.user ? req.user.userId:'No user info in this request'}`);

        if(!name || !description) {
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