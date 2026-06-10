const {updateCatalog} = require('../Services/UpdateCatalogService');

const updateController = async (req, res) => {
    try {
        // 1. Validamos solo lo esencial (la tabla y el identificador)
        const { table } = req.body;

        console.warn(`Tabla solicitada:${table}`);
        if (!table) {
            return res.status(400).json({ message: 'La tabla es obligatoria', result: false });
        }

        // 2. Pasamos el objeto completo al servicio. 
        // El servicio debe encargarse de ignorar los campos que sean undefined.
        const result = await updateCatalog(req.body);

        // 3. Respuesta según el resultado
        if (!result.result) {
            return res.status(400).json({ message: result.message, result: false });
        }

        return res.status(200).json({ 
            message: result.message, 
            data: result.data, 
            result: true 
        });

    } catch (err) {
        console.error(`[ERROR] ${err.message}`);
        return res.status(500).json({ message: 'Error interno del servidor', result: false });
    }
};

module.exports = { updateController };

module.exports={updateController}

module.exports={updateController}