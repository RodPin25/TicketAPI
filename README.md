# Proyecto de Ingeniería de Software - Sistema de Gestión de Parqueadero

Este proyecto es un sistema integral de gestión de parqueaderos, diseñado para automatizar el control de entradas, salidas, cobros y auditoría de vehículos. Ha evolucionado hacia una arquitectura más liviana y eficiente, optimizando la persistencia de datos y la seguridad del usuario.

## 🚀 Tecnologías y Herramientas Actualizadas

- **Backend:** Node.js con Express 5.
- **Base de Datos:** SQL Server (utilizando el controlador nativo `mssql`).
- **Seguridad:**
  - `bcrypt` para el hashing seguro de contraseñas.
  - `jsonwebtoken` (JWT) para la autenticación y autorización de rutas.
- **Validación:** Implementación de validaciones mediante expresiones regulares (Regex) para nombres de usuario y contraseñas desde la capa de control.
- **Gestión de Entorno:** `dotenv` para configuración de variables sensibles.
- **Generación de Datos (Dev):** `@faker-js/faker` para pruebas y simulación de datos.

## 🏗️ Arquitectura del Proyecto (Actualizada)

El sistema se ha reestructurado para mejorar la separación de responsabilidades, migrando hacia una capa de Servicios más robusta:

- **`src/Routes/`**: Define los endpoints de la API. Actualmente centralizado en `authRoutes.js`.
- **`src/Controllers/`**: Maneja las solicitudes HTTP y realiza validaciones de entrada (ej. formato de nombre/password) antes de llamar a la lógica de negocio.
- **`src/Services/`**: Contiene la lógica de negocio principal y las consultas directas a SQL Server. Se han consolidado los siguientes servicios:
  - `LoginService`: Gestión de autenticación y generación de tokens.
  - `BrandService` & `ModelService`: Administración de marcas y modelos específicos de vehículos.
  - `TypeService`: Clasificación de tipos de vehículos (Moto, Carro, etc.).
  - `CarService`: Registro y gestión de vehículos en el sistema.
  - `TicketService`: Generación de comprobantes de ingreso y control de estados de pago.
  - `ConfigPay`: Configuración dinámica de tarifas y tipos de cobro.
- **`src/Middlewares/`**:
  - `AuthMiddleware`: Protección de rutas mediante verificación de tokens JWT.
  - `logger.js`: Sistema de auditoría centralizado que registra cada acción en la base de datos (IP, usuario, acción y descripción).
- **`src/database/`**: Consultas optimizadas para la recuperación de información específica (ej. `InfoCobro.js`).

## 📊 Modelo de Datos y Auditoría

El sistema garantiza la trazabilidad total mediante:

- **Vehículos & Modelos:** Relación jerárquica entre Tipos, Marcas y Modelos para una clasificación precisa.
- **Gestión de Tickets:** Control de flujo de caja y tiempos de permanencia.
- **Configuración de Cobros:** Flexibilidad para ajustar tarifas sin modificar el código.
- **Logs de Auditoría:** Registro obligatorio en cada servicio para acciones de creación, actualización o consulta sensible.

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
   USERNAME_REGEX="^[a-zA-Z0-9_]{3,16}$"
   PASSWORD_REGEX="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
   SALT_ROUNDS=11
   ```

## 🔐 Seguridad y Validación

- **Contraseñas:** No se almacenan en texto plano; se utiliza `bcrypt` con un factor de costo configurable (`SALT_ROUNDS`) para garantizar la integridad de los datos.
- **Validación de Entrada:** Se implementaron validaciones estrictas mediante expresiones regulares para nombres de usuario y contraseñas, centralizadas en variables de entorno para mayor flexibilidad.
- **Tokens:** La autenticación se maneja vía `Bearer Token`. Las sesiones expiran automáticamente para mayor seguridad.
- **Registro de Usuarios:** Se incorporó un nuevo flujo de registro (`SignUp`) que incluye hashing de contraseñas y validaciones de formato antes de la persistencia.
- **Auditoría:** El sistema de logs permite rastrear cualquier actividad sospechosa o realizar seguimiento de operaciones.

---
*Documentación actualizada tras la migración de herramientas y corrección de bugs.*
