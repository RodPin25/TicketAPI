const service = require('../Services/ConsultarService');

const retrieveController = async (req,res) => {
    try{
        const {table,id,licensePlate} = req.body;

        if(!table || !id || !licensePlate) return res.status(400).json({message: result.message});

        const result = await service.retrieveService(req);
        
        if(!result.result) return res.status(400).json({message: result.message});

        console.log('[INFO] ',result.message);
        return res.status(200).json({message: result.message, data: result.data});
    } catch(err){
        console.error('[ERROR] ',err.message);
        return res.status(500).json(err.message);
    }
}

module.exports = {retrieveController};