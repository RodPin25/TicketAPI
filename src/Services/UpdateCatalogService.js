const {SQL, PoolPromise} = require('../config/db');

const updateCatalog = async (params) => {
    // Desestructuramos el objeto params
    const { table, id, licensePlate, name, description, idReference, status, rate } = params;

    console.log(`Id entrante al servicio: ${id}`);
    console.log(`Id Referencia ${idReference}`);
    try {
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('Tabla', SQL.VarChar(20), String(table || '').trim().toUpperCase())
            .input('Id', SQL.Int, id || null)
            .input('Placa', SQL.VarChar(15), licensePlate || null)
            .input('Nombre', SQL.VarChar(100), name || null)
            .input('Descripcion', SQL.VarChar(255), description || null)
            .input('IdReferencia', SQL.Int, idReference || null)
            .input('Status', SQL.Bit, status !== undefined ? status : null)
            .input('Multiplicador', SQL.Decimal(18, 2), rate || null)
            .execute('sp_ActualizarCatalogos');

        // Los procedimientos de UPDATE generalmente retornan rowsAffected, no recordsets
        return { 
            result: true, 
            message: 'Information updated successfully', 
            rowsAffected: result.rowsAffected 
        };
    } catch (err) {
        console.error(`[ERROR] ${err.message}`);
        return { result: false, message: err.message };
    }
}

module.exports = {updateCatalog}