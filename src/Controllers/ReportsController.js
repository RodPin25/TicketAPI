const { getReport, getEstanciaReport } = require('../Services/ReportsService');

const getReportController = async (req, res) => {
    try {
        const result = await getReport();

        if (!result.result) {
            return res.status(500).json({ message: result.message, result: false });
        }

        return res.status(200).json({
            message: 'Reporte generado exitosamente',
            data: result.data,
            result: true
        });
    } catch (err) {
        console.error(`[ERROR Controller] ${err.message}`);
        return res.status(500).json({ message: 'Error interno del servidor', result: false });
    }
};


const getEstanciaReportController = async (req, res) => {
    try {
        const result = await getEstanciaReport();

        if (!result.result) {
            return res.status(500).json({ 
                message: result.message, 
                result: false 
            });
        }

        // Aquí 'result.data' es el array con los 7 días de la semana
        return res.status(200).json({
            message: 'Reporte de estancia generado exitosamente',
            data: result.data, // Array: [{DiaSemana: 'Monday', PromedioEstanciaMinutos: 45, TotalDiario: 1500}, ...]
            result: true
        });
    } catch (err) {
        console.error(`[ERROR Reporte Estancia] ${err.message}`);
        return res.status(500).json({ 
            message: 'Error interno al generar el reporte de estancia', 
            result: false 
        });
    }
};

module.exports = { 
    getReportController,
    getEstanciaReportController
};