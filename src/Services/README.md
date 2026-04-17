# Capa de Servicios - Documentación

Esta carpeta contiene la lógica de negocio de la aplicación, organizada en servicios especializados. Cada servicio se encarga de interactuar con la base de datos a través de procedimientos almacenados (Stored Procedures) y manejar la lógica necesaria antes de devolver una respuesta.

## Servicios Disponibles

### 1. BrandService.js
Maneja la creación de marcas de vehículos.
- **Función:** `createBrandService`
- **Cambios realizados:** Se corrigió la importación de la base de datos y se estandarizó a CommonJS. Se aseguró el uso de `SQL.VarChar` y `PoolPromise`.

### 2. CarService.js
Gestiona el registro de vehículos en el sistema.
- **Función:** `createService`
- **Cambios realizados:** Corrección de la ruta de configuración de DB y estandarización de tipos de datos SQL.

### 3. ConfigPay.js
Permite configurar y actualizar los montos de cobro por tipo de servicio.
- **Funciones:** `createService`, `updateService`
- **Cambios realizados:** Se eliminó una importación errónea de `typescript`. Se añadió el registro de logs para las actualizaciones de montos.

### 4. LoginService.js
Servicio crítico para la autenticación de usuarios y generación de tokens JWT.
- **Función:** `authService`
- **Cambios realizados:** 
    - Se corrigieron variables no definidas (`email` y `userInfo`).
    - Ahora extrae correctamente la información del `recordset` devuelto por el SP.
    - Estandarización total a CommonJS para evitar conflictos con `jsonwebtoken` y `bcrypt`.

### 5. ModelService.js
Maneja la creación de modelos específicos para las marcas de vehículos.
- **Función:** `createModelService`
- **Cambios realizados:** Se añadió el `await` faltante al `PoolPromise`, lo cual era un error crítico que impedía la conexión.

### 6. TicketService.js
Gestiona la creación de tickets de parqueo/cobro.
- **Función:** `createService`
- **Cambios realizados:** Se añadió el `module.exports` que faltaba y se estandarizó la lógica de logs.

### 7. TypeService.js
Gestiona los tipos de vehículos (ej: Liviano, Pesado, Motocicleta).
- **Función:** `createService`
- **Cambios realizados:** Se eliminó la dependencia innecesaria de `@faker-js/faker`.

---

## Estándares de Implementación

1. **Manejo de Errores:** Todos los servicios utilizan bloques `try-catch` y devuelven un objeto consistente: `{ result: boolean, message: string, data?: any }`.
2. **Conexión a DB:** Se utiliza `PoolPromise` exportado desde `src/Config/db.js` para asegurar que la conexión esté establecida antes de realizar peticiones.
3. **Seguridad:** El servicio de Login utiliza `bcrypt` para la comparación de hashes y `jsonwebtoken` para la gestión de sesiones.
4. **Logs:** Se integra con `saveLog` para registrar acciones críticas en el sistema (Login, Creación de Tickets, etc.).
