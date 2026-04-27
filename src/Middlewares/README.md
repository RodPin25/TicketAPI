# Capa de Middlewares - Documentación

Los middlewares son funciones que se ejecutan durante el ciclo de petición-respuesta antes de llegar al controlador. Se utilizan para tareas transversales como seguridad, registro de logs y validaciones.

## Middlewares Disponibles

### 1. AuthMiddleware.js
Se encarga de la seguridad de la API.
- **Función:** Verifica la presencia y validez de un token JWT en el header `Authorization`.
- **Comportamiento:**
  - Si el token es válido, decodifica la información del usuario y permite que la petición continúe (`next()`).
  - Si el token falta o es inválido, retorna un error `401 Unauthorized`.

### 2. logger.js
Se encarga de registrar las actividades del sistema en la base de datos.
- **Función:** Proporciona utilidades para guardar logs de auditoría (quién hizo qué, desde dónde y cuándo).
- **Uso:** Puede ser llamado desde los servicios para dejar rastro de operaciones críticas.

---

## Cómo aplicar un Middleware

Para proteger una ruta, se inserta el middleware como segundo argumento en la definición de la misma:

```javascript
const authMiddleware = require('../Middlewares/AuthMiddleware');
router.post('/protected-route', authMiddleware, controller);
```
