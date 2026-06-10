const {SQL, PoolPromise}=require('../config/db');

const getReport = async () => {
    try {
        const pool = await PoolPromise;
        const result = await pool.request()
            .execute('sp_ObtenerReporteTickets');

        // result.recordset[0] traerá { TotalPagadosHoy: X, PromedioUltimos30Dias: Y }
        return {
            result:true,
            data: result.recordset[0]
        }
    } catch (err) {
        return res.status(500).json({ result: false, message: err.message });
    }
}

const getEstanciaReport = async () => {
    try {
        const pool = await PoolPromise;
        const result = await pool.request()
            .execute('sp_ObtenerReporteEstancia');

        return { 
            result: true, 
            data: result.recordset // Aquí recibes la lista de días
        };
    } catch (err) {
        return { result: false, message: err.message };
    }
};

module.exports={
    getReport,
    getEstanciaReport
}