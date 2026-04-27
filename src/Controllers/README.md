# Capa de Controladores - Documentación

Los controladores actúan como intermediarios entre las rutas y los servicios. Su responsabilidad principal es recibir la petición (req), validar que los datos necesarios estén presentes y enviar la respuesta (res) adecuada basada en el resultado del servicio.

## Controladores Disponibles

### Gestión de Catálogos
- **BrandController.js**: Maneja la creación de marcas de vehículos.
- **ModelController.js**: Maneja la creación de modelos de vehículos.
- **TypeController.js**: Maneja la creación de tipos de vehículos (Sedán, SUV, etc).
- **UpdateController.js**: Controlador genérico para actualizar cualquier catálogo mediante procedimientos almacenados.
- **ConsultarController.js**: Controlador genérico para recuperar información de los catálogos.

### Gestión de Operaciones
- **CarController.js**: Maneja el registro de vehículos vinculados a placas.
- **TicketController.js**: Controla la creación de tickets de entrada y la actualización (cierre) de los mismos al salir.
- **PaymentController.js**: Gestiona las configuraciones de costos y cobros.

### Autenticación
- **LoginController.js**: Procesa el inicio de sesión y generación de tokens.
- **SignUpController.js**: Procesa el registro de nuevos usuarios.

---

## Estructura Típica de un Controlador

```javascript
const service = require('../Services/ExampleService');

const exampleController = async (req, res) => {
    try {
        // 1. Extracción de datos
        const { field } = req.body;

        // 2. Validación básica
        if (!field) return res.status(400).json({ message: 'Missing fields' });

        // 3. Llamada al servicio
        const result = await service.doSomething(req);

        // 4. Respuesta al cliente
        if (!result.result) return res.status(400).json(result);
        return res.status(200).json(result);
    } catch (err) {
        // 5. Manejo de errores inesperados
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
```
