# Capa de Rutas - Documentación

Esta carpeta contiene la definición de los puntos de entrada (endpoints) de la API. Las rutas están organizadas por funcionalidad y utilizan los controladores correspondientes para procesar las peticiones.

## Grupos de Rutas

### 1. Rutas de Autenticación (`/api/auth`)
Definidas en `authRoutes.js`. Estas rutas son públicas y permiten la gestión de sesiones.

| Endpoint | Método | Descripción | Controlador |
|----------|--------|-------------|-------------|
| `/login` | `POST` | Autentica un usuario y devuelve un token JWT. | `authController` |

### 2. Rutas de Creación y Gestión (`/api/create`)
Definidas en `createRoutes.js`. **Todas estas rutas están protegidas** por el `AuthMiddleware`, lo que significa que requieren un token válido en los headers.

| Endpoint | Método | Descripción | Controlador |
|----------|--------|-------------|-------------|
| `/brands` | `POST` | Registra una nueva marca de vehículo. | `brandController` |
| `/cars` | `POST` | Registra un nuevo vehículo (placa, modelo). | `carController` |
| `/models` | `POST` | Registra un nuevo modelo de vehículo. | `modelController` |
| `/payments`| `POST` | Crea una nueva configuración de monto de cobro. | `paymentCreateController` |
| `/payments`| `PUT`  | Actualiza un monto de cobro existente. | `paymentUpdateController` |
| `/tickets` | `POST` | Genera un nuevo ticket de entrada. | `ticketCreateController` |
| `/types` | `POST` | Registra un nuevo tipo de vehículo. | `typeCreateController` |

---

## Middlewares Utilizados

- **AuthMiddleware:** Se encarga de validar el token JWT enviado por el cliente. Si el token es inválido o no está presente, la petición es rechazada con un código `401 Unauthorized`. Se aplica de forma global a todas las rutas en `createRoutes.js`.

---

## Configuración en el Servidor (`app.js`)

Las rutas se registran en la aplicación principal bajo los siguientes prefijos:
- `app.use('/api/auth', authRoutes);`
- `app.use('/api/create', createRoutes);`
