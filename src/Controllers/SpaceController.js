const {spaceService} = require('../Services/SpaceService');

const spaceController = (req,res) =>{
    const {idParqueo}=req.body;

    if(!idParqueo) return res.status(400).json({message:'An ID is required'});

    try{
        const result = await spaceService(req);

        if(!result.result) return res.status(401).json({message:result.message});

        console.log('[INFO] Parking information succesfully retrieved');
        return res.status(200).json({message:result.message,data:result.data});
    } catch(err){
        console.error('[ERROR] ', err.message);
        return res.status(500).json({message:err.message});
    }
}

module.exports = {spaceController}