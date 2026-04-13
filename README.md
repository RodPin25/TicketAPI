# Proyecto de Ingeniería de Software - Sistema de Gestión de Parqueadero

Este es un sistema de gestión para el control de entrada, salida y cobro en un parqueadero, desarrollado con una arquitectura robusta y escalable en capas.

## 🚀 Tecnologías Utilizadas

- **Backend:** Node.js con Express 5.
- **Base de Datos:** SQL Server.
- **ORM:** Prisma.
- **Autenticación:** JSON Web Tokens (JWT).
- **Gestión de Entorno:** Dotenv.

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura organizada por capas para separar las responsabilidades y facilitar el mantenimiento:

- **`src/Routes/`**: Define los puntos de entrada (endpoints) de la API y los asocia con sus controladores.
- **`src/Controllers/`**: Maneja las solicitudes HTTP, realiza validaciones básicas (como Regex para correos y contraseñas) y envía las respuestas al cliente.
- **`src/Services/`**: Contiene la lógica de negocio central, procesando datos y comunicándose con la capa de persistencia.
- **`src/Repositories/`**: Encargado de las operaciones directas con la base de datos a través de Prisma.
- **`src/Middlewares/`**: Funciones intermedias para tareas como autenticación y autorización mediante JWT.
- **`src/Config/`**: Configuraciones globales del sistema, incluyendo la conexión a la base de datos.

## 📊 Modelo de Datos (Prisma)

El sistema cuenta con los siguientes modelos principales:

- **Usuarios:** Gestión de acceso y roles (Admin/Operador).
- **Tickets:** Registro de entradas, salidas, montos y estados de pago.
- **Vehículos:** Información de placas y modelos.
- **Marca y Modelos:** Clasificación detallada de los vehículos.
- **Tipo de Vehículo:** Categorización (Moto, Carro, etc.).
- **Configuración de Cobro:** Definición de tarifas por tiempo o tipo.

## 🛠️ Configuración e Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar el entorno:**
   Crea un archivo `.env` en la raíz con las siguientes variables:
   ```env
   DATABASE_URL="sqlserver://<host>:<port>;database=<db_name>;user=<user>;password=<password>;encrypt=true"
   JWT_SECRET="tu_secreto_para_jwt"
   EMAIL_REGEX="^[^\s@]+@[^\s@]+\.[^\s@]+$"
   PASSWORD_REGEX="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
   ```

3. **Generar el cliente de Prisma:**
   ```bash
   npx prisma generate
   ```

## 🔐 Autenticación

El sistema utiliza JWT para proteger las rutas. Para acceder a las funciones protegidas, se debe incluir el token en los encabezados de la solicitud:
`Authorization: Bearer <token_jwt>`

---
*Desarrollado como parte del curso de Ingeniería de Software.*
