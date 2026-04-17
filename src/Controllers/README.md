# Capa de Controladores - Documentación

Esta carpeta contiene los controladores de la aplicación, que actúan como intermediarios entre las rutas y los servicios. Su responsabilidad es validar la entrada básica, llamar a los servicios correspondientes y devolver la respuesta HTTP adecuada.

## Controladores Disponibles

### 1. BrandController.js
Gestiona las peticiones relacionadas con las marcas de vehículos.
- **Función:** `brandController`
- **Cambios realizados:** Se corrigió la validación del resultado del servicio para manejar correctamente el objeto de respuesta.

### 2. CarController.js
Maneja el registro de nuevos vehículos.
- **Función:** `carController`
- **Cambios realizados:** Asegurada la consistencia en el manejo de respuestas y códigos de estado.

### 3. LoginController.js
Controla el proceso de autenticación de usuarios.
- **Función:** `authController`
- **Cambios realizados:** 
    - Convertido a función `async` para permitir el uso de `await`.
    - Añadido `module.exports` (faltaba anteriormente).
    - Implementada validación de regex de forma segura.
    - Sincronizado con el servicio de login para usar `username`/`password`.

### 4. ModelController.js
Gestiona la creación de modelos de vehículos.
- **Función:** `modelController`
- **Cambios realizados:** Estandarización de validaciones de campos requeridos.

### 5. PaymentController.js
Controla la configuración de los montos de cobro.
- **Funciones:** `createController`, `updateController`
- **Cambios realizados:** 
    - Se corrigió el nombre de la importación (`ConfiPayService` -> `ConfigPay`).
    - Se añadió `updateController` para permitir la actualización de montos, sincronizándolo con el servicio.

### 6. TicketController.js
Gestiona la creación y cierre de tickets de parqueo.
- **Funciones:** `createController`, `updateController`
- **Cambios realizados:** Sincronización completa con `TicketService` para las operaciones de apertura y cierre de tickets.

### 7. TypeController.js
Maneja los tipos de vehículos disponibles.
- **Función:** `createController`
- **Cambios realizados:** Renombrada la función interna para mantener la consistencia con el resto de los controladores.

---

## Estándares de Implementación

1. **Validación:** Cada controlador verifica que los campos obligatorios estén presentes en el `req.body` antes de llamar al servicio.
2. **Códigos de Estado:** 
    - `201 Created`: Para creaciones exitosas.
    - `200 OK`: Para actualizaciones o consultas exitosas.
    - `400 Bad Request`: Para errores de validación del cliente.
    - `401 Unauthorized`: Para fallos en la autenticación.
    - `500 Internal Server Error`: Para errores no controlados o fallos en la capa de servicios.
3. **Manejo de Respuestas:** Todas las respuestas devuelven un objeto JSON consistente para facilitar el consumo por parte del frontend.
