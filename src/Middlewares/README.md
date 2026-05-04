# Capa de Middlewares - Documentación

Los middlewares son funciones que se ejecutan durante el ciclo de petición-respuesta antes de llegar al controlador. Se utilizan para tareas transversales como seguridad, registro de logs y validaciones.

## Middlewares Disponibles

### 1. AuthMiddleware.js
Se encarga de la seguridad y el control de acceso de la API.

#### `authToken`
- **Función:** Verifica la presencia y validez de un token JWT en el header `Authorization`.
- **Comportamiento:**
  - Si el token es válido, decodifica la información del usuario, la adjunta a `req.user` y permite que la petición continúe (`next()`).
  - Si el token falta o es inválido, retorna un error `401` o `403`.

#### `checkRole(roles)`
- **Función:** Verifica si el usuario autenticado tiene uno de los roles permitidos.
- **Parámetros:** `roles` (Array de strings) - Lista de roles autorizados (ej: `['admin', 'manager']`).
- **Comportamiento:**
  - Si el rol del usuario está en la lista, continúa.
  - Si no, retorna un error `403 Forbidden`.

### 2. logger.js
Se encarga de registrar las actividades del sistema en la base de datos.
- **Función:** Proporciona utilidades para guardar logs de auditoría (quién hizo qué, desde dónde y cuándo).
- **Uso:** Puede ser llamado desde los servicios para dejar rastro de operaciones críticas.

---

## Cómo aplicar un Middleware

Para proteger una ruta por autenticación y rol:

```javascript
const { authToken, checkRole } = require('../Middlewares/AuthMiddleware');

// Solo autenticado
router.get('/public-data', authToken, controller);

// Autenticado y con rol de administrador
router.get('/reports', authToken, checkRole(['admin']), controller);
```
