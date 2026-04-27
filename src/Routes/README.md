# Capa de Rutas - Documentación

Esta carpeta contiene la definición de los puntos de entrada (endpoints) de la API. Las rutas están organizadas por funcionalidad y utilizan los controladores correspondientes para procesar las peticiones.

## Grupos de Rutas

### 1. Rutas de Autenticación (`/api/auth`)
Definidas en `authRoutes.js`. Estas rutas son públicas y permiten la gestión de sesiones.

| Endpoint | Método | Descripción | Controlador |
|----------|--------|-------------|-------------|
| `/login` | `POST` | Autentica un usuario y devuelve un token JWT. | `LoginController` |
| `/signup`| `POST` | Registra un nuevo usuario en el sistema. | `SignUpController` |

### 2. Rutas de Creación (`/api/create`)
Definidas en `createRoutes.js`. Gestionan la inserción de nuevos registros. Protegidas por `AuthMiddleware`.

| Endpoint | Método | Descripción | Controlador |
|----------|--------|-------------|-------------|
| `/brands` | `POST` | Registra una nueva marca de vehículo. | `brandController` |
| `/cars` | `POST` | Registra un nuevo vehículo (placa, modelo). | `carController` |
| `/models` | `POST` | Registra un nuevo modelo de vehículo. | `modelController` |
| `/payments`| `POST` | Crea una nueva configuración de monto de cobro. | `paymentCreateController` |
| `/tickets` | `POST` | Genera un nuevo ticket de entrada. | `ticketCreateController` |
| `/types` | `POST` | Registra un nuevo tipo de vehículo. | `typeCreateController` |

### 3. Rutas de Actualización (`/api/update`)
Definidas en `updateRoutes.js`. Gestionan la modificación de registros existentes. Protegidas por `AuthMiddleware`.

| Endpoint | Método | Descripción | Controlador |
|----------|--------|-------------|-------------|
| `/ticket` | `POST` | Cierra un ticket de parqueo (actualiza estado). | `ticketUpdateController` |
| `/catalog`| `POST` | Actualización genérica de catálogos (marcas, modelos, etc). | `genericUpdateController` |
| `/payments`| `PUT`  | Actualiza un monto de cobro existente. | `paymentUpdateController` |

### 4. Rutas de Consulta (`/api/retrieve`)
Definidas en `consultarRoutes.js`. Gestionan la obtención de información. Protegidas por `AuthMiddleware`.

| Endpoint | Método | Descripción | Controlador |
|----------|--------|-------------|-------------|
| `/catalog`| `POST` | Consulta información de catálogos con filtros opcionales. | `retrieveController` |

---

## Middlewares Utilizados

- **AuthMiddleware:** Valida el token JWT en los headers de la petición (`Authorization`). Si no es válido, retorna `401 Unauthorized`.

---

## Configuración en el Servidor (`app.js`)

Prefijos registrados:
- `/api/auth`
- `/api/create`
- `/api/update`
- `/api/retrieve`
