# Configuración del Sistema - Documentación

Esta carpeta contiene los archivos de configuración global para el backend, centrados principalmente en la conectividad y variables de entorno.

## Archivos

### 1. db.js
Configura la conexión a la base de datos Microsoft SQL Server.
- **Tecnología:** Utiliza el paquete `mssql`.
- **Exportaciones:**
  - `SQL`: Referencia a los tipos de datos de SQL (VarChar, Int, etc).
  - `PoolPromise`: Una promesa que gestiona el pool de conexiones, asegurando que solo haya una conexión activa reutilizable.
- **Requisito:** Depende de las variables de entorno definidas en el archivo `.env` en la raíz del proyecto.

---

## Variables de Entorno Requeridas (.env)

Para que el sistema funcione, deben estar definidas las siguientes variables:

```env
DB_USER=usuario
DB_PASSWORD=contraseña
DB_SERVER=servidor
DB_DATABASE=nombre_bd
JWT_SECRET=secreto_para_tokens
PORT=3000
```
