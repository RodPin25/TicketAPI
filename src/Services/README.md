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

### 5. SignUpService.js
Gestiona la creación de nuevos usuarios con seguridad.
- **Función:** `createService`
- **Cambios realizados:**
    - Implementación de hashing de contraseñas con `bcrypt`.
    - Comparación de contraseñas (`password1` vs `password2`) en la capa de servicio.
    - Ejecución del SP `sp_SignUpService` con parámetros de auditoría (IP).

### 6. ModelService.js
Maneja la creación de modelos específicos para las marcas de vehículos.
- **Función:** `createModelService`
- **Cambios realizados:** Se añadió el `await` faltante al `PoolPromise`, lo cual era un error crítico que impedía la conexión.

### 7. TicketService.js
Gestiona el ciclo de vida completo de los tickets de parqueo (creación, cálculo de costos y cierre).
- **Funciones:** `createService`, `updateService`, `calculateAmount` (interna)
- **Cambios realizados:**
    - **Generación de QR:** El `createService` ahora devuelve un `qrString` con el formato `IS-{idTicket}-GP3` para ser utilizado en el proceso de salida.
    - **Validación de QR:** El `updateService` implementa una validación estricta de la cadena QR para asegurar la integridad del ticket antes de procesar el pago.
    - **Cierre de Tickets:** Extrae el `idTicket` directamente del QR para proceder con el cálculo de monto y ejecución de `sp_closeTicket`.
    - **Motor de Cálculo:** Se añadió `calculateAmount`, una función robusta que determina el monto a cobrar basándose en la diferencia de tiempo entre la entrada y la salida.
    - **Soporte de Tarifas:** Soporte para `HORA`, `DIA` y `MEDIA HORA`.
    - **Auditoría:** Integración de parámetros de IP y usuario en todas las operaciones para trazabilidad.

### 8. TypeService.js
Gestiona los tipos de vehículos (ej: Liviano, Pesado, Motocicleta).
- **Función:** `createService`
- **Cambios realizados:** Se eliminó la dependencia innecesaria de `@faker-js/faker`.

---

## Estándares de Implementación

1. **Manejo de Errores:** Todos los servicios utilizan bloques `try-catch` y devuelven un objeto consistente: `{ result: boolean, message: string, data?: any }`.
2. **Conexión a DB:** Se utiliza `PoolPromise` exportado desde `src/Config/db.js` para asegurar que la conexión esté establecida antes de realizar peticiones.
3. **Seguridad:** El servicio de Login utiliza `bcrypt` para la comparación de hashes y `jsonwebtoken` para la gestión de sesiones.
4. **Logs:** Se integra con `saveLog` para registrar acciones críticas en el sistema (Login, Creación de Tickets, etc.).
