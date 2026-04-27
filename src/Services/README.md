# Capa de Servicios - Documentación

La capa de servicios contiene la lógica de negocio y la interacción directa con la base de datos (a través de la configuración de SQL Server). Cada servicio se encarga de ejecutar procedimientos almacenados y procesar los resultados antes de devolverlos al controlador.

## Servicios Principales

### Catálogos y Mantenimiento
- **BrandService.js**: Lógica para insertar nuevas marcas (`sp_InsertBrand`).
- **ModelService.js**: Lógica para insertar nuevos modelos (`sp_InsertModel`).
- **TypeService.js**: Lógica para insertar tipos de vehículos (`sp_InsertType`).
- **UpdateService.js**: Lógica genérica de actualización utilizando `sp_MantenimientoCatalogos`.
- **ConsultarService.js**: Lógica de recuperación de datos utilizando `sp_ConsultarCatalogos`.

### Operaciones de Negocio
- **CarService.js**: Registro de vehículos.
- **TicketService.js**: Lógica compleja para la creación y cierre de tickets, incluyendo el cálculo de tiempos y estados.
- **PaymentService.js**: Configuración de montos y tipos de cobro.

### Seguridad y Acceso
- **LoginService.js**: Validación de credenciales y generación de JWT.
- **SignUpService.js**: Creación de nuevos usuarios y hashing de contraseñas.

---

## Interacción con la Base de Datos

Los servicios utilizan `PoolPromise` y `SQL` desde `src/config/db.js` para realizar peticiones asíncronas.

Ejemplo de implementación:
```javascript
const { SQL, PoolPromise } = require('../config/db');

const serviceMethod = async (data) => {
    try {
        const pool = await PoolPromise;
        const result = await pool.request()
            .input('ParamName', SQL.Type, data.value)
            .execute('StoredProcedureName');
        
        return { result: true, data: result.recordset };
    } catch (err) {
        return { result: false, message: err.message };
    }
}
```
