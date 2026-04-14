# Proyecto de Ingeniería de Software - Sistema de Gestión de Parqueadero

Este proyecto es un sistema integral de gestión de parqueaderos, diseñado para automatizar el control de entradas, salidas, cobros y auditoría de vehículos. Ha evolucionado hacia una arquitectura más liviana y eficiente, optimizando la persistencia de datos y la seguridad del usuario.

## 🚀 Tecnologías y Herramientas Actualizadas

- **Backend:** Node.js con Express 5.
- **Base de Datos:** SQL Server (utilizando el controlador nativo `mssql`).
- **Seguridad:** 
  - `bcrypt` para el hashing seguro de contraseñas.
  - `jsonwebtoken` (JWT) para la autenticación y autorización de rutas.
- **Validación:** Implementación de validaciones mediante expresiones regulares (Regex) para correos y contraseñas desde la capa de control.
- **Gestión de Entorno:** `dotenv` para configuración de variables sensibles.
- **Generación de Datos (Dev):** `@faker-js/faker` para pruebas y simulación de datos.

## 🏗️ Arquitectura del Proyecto (Actualizada)

El sistema se ha reestructurado para mejorar la separación de responsabilidades, migrando hacia una capa de Servicios más robusta:

- **`src/Routes/`**: Define los endpoints de la API. Actualmente centralizado en `authRoutes.js`.
- **`src/Controllers/`**: Maneja las solicitudes HTTP y realiza validaciones de entrada (ej. formato de email/password) antes de llamar a la lógica de negocio.
- **`src/Services/`**: Contiene la lógica de negocio principal y las consultas directas a SQL Server. Se han añadido servicios para:
  - `LoginService`: Gestión de autenticación y generación de tokens.
  - `BrandService`: Administración de marcas de vehículos.
  - `TypeService`: Clasificación de tipos de vehículos (Moto, Carro, etc.).
  - `CarService` & `TicketService`: (En desarrollo) Gestión de vehículos y comprobantes de pago.
- **`src/Middlewares/`**: 
  - `AuthMiddleware`: Protección de rutas mediante verificación de tokens JWT.
  - `logger.js`: **Nueva funcionalidad** para la auditoría del sistema, registrando acciones de usuario directamente en la base de datos.
- **`src/Config/`**: Configuración centralizada de la conexión a SQL Server (`db.js`).

## 📊 Modelo de Datos y Auditoría

Se han definido los siguientes componentes esenciales:

- **Usuarios:** Control de acceso con roles (Admin/Operador).
- **Vehículos & Marcas:** Gestión detallada de la flota y sus fabricantes.
- **Tickets:** Registro de transacciones y estados de pago.
- **Logs de Auditoría:** Registro de cada acción crítica realizada en el sistema (Creación de marcas, logins, etc.), incluyendo IP de origen y usuario responsable.

## 🛠️ Configuración e Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Variables de Entorno (.env):**
   Configura un archivo `.env` en la raíz con los siguientes parámetros:
   ```env
   DB_USER="tu_usuario"
   DB_PASSWORD="tu_password"
   DB_HOST="tu_host"
   DB_NAME="tu_base_de_datos"
   DB_PORT=1433
   SECRET_KEY="tu_clave_secreta_jwt"
   EMAIL_REGEX="^[^\s@]+@[^\s@]+\.[^\s@]+$"
   PASSWORD_REGEX="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
   ```

## 🔐 Seguridad y Validación

- **Contraseñas:** No se almacenan en texto plano; se utiliza `bcrypt` para garantizar la integridad de los datos.
- **Tokens:** La autenticación se maneja vía `Bearer Token`. Las sesiones expiran automáticamente para mayor seguridad.
- **Auditoría:** El sistema de logs permite rastrear cualquier actividad sospechosa o realizar seguimiento de operaciones.

---
*Documentación actualizada tras la migración de herramientas y corrección de bugs.*
