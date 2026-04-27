const updateService = require('../Services/UpdateService');

const updateController = async (req,res) =>{
    try{
        const {Tabla, Id, Placa, Nombre, Descripcion, Estado, ip, Password, idUserEjecutor} = req.body;

        if(!Tabla || !Id ||  !Placa || !Nombre || !Descripcion || !Estado || !ip || !Password || !idUserEjecutor){
            return res.status(400).json({message: 'Missing Fields. Fields required: Tabla, Id, Placa, Nombre, Descripcion, Estado, ip, Password, idUserEjecutor'})
        }

        const result = await updateService.updateService(req, res);

        if(!result.result) {
            return res.status(400).json({message: result.message});
        }

        return res.status(200).json({message: result.message});
    } catch(err){
        console.error('[ERROR] ',err.message);
        return res.status(500).json({message: err.message});
    }
}

module.exports = {updateController}
