# Capa de Acceso a Datos - Documentación

Esta carpeta contiene módulos experimentales para consultas directas a la base de datos sin el uso extensivo de procedimientos almacenados, o lógica que está en proceso de migración.

## Archivos

- **InfoCobro.js**: Contiene funciones para recuperar la configuración de cobros directamente desde las tablas.
- **InfoVehiculo.js**: Contiene funciones para consultar información detallada de vehículos por placa o ID.

## Notas de Desarrollo

> **ADVERTENCIA:** Algunos archivos en esta carpeta pueden contener inconsistencias de sintaxis (mezcla de `import` y `require`). Se recomienda priorizar el uso de la capa de **Servicios** para nuevas funcionalidades, ya que esta capa está diseñada para interactuar con procedimientos almacenados de forma estandarizada.
