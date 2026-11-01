# Plan de pruebas y evidencias pendientes

Estas pruebas deben realizarse **en una instalación real de Ionic**, con capturas de pantalla del alumno. No se debe afirmar que están realizadas hasta comprobarlas.

| Prueba | Procedimiento | Resultado esperado | Evidencia |
|---|---|---|---|
| P1 | Abrir `http://localhost:8100` | Inicio, contador 0, lista vacía sin errores | Captura 1 |
| P2 | Nueva tarea -> título y descripción -> Guardar | Aparece la tarea con ambos textos; formulario se limpia | Captura 2 |
| P3 | Agregar segunda tarea | Ambas aparecen; contador pasa a 2 | Captura 3 |
| P4 | Editar la primera tarea | Cambian solo sus datos; se mantiene la segunda | Captura 4 |
| P5 | Intentar guardar campos vacíos | Se muestran advertencias; no se agrega la tarea | Captura 5 |
| P6 | Marcar tarea como completada y filtrar | Contadores y pestañas se actualizan | Captura 6 |
| P7 | Eliminar una tarea y confirmar | Se elimina solo la seleccionada | Captura 7 |
| P8 | Abrir menú -> Cómo usar la app -> Volver | Navegación fluida y datos conservados | Captura 8 |
| P9 | Revisar desde ancho móvil (360 px) | Sin desplazamiento horizontal ni superposiciones | Captura 9 |
| P10 | Recargar la aplicación | Se pierden las tareas (alcance de Unidad 1) | Nota documentada |

**Pruebas automáticas:** `npm run test:logic` comprueba validación, inserción, edición, eliminación y cambio de estado. `npm run build` detecta errores de TypeScript y empaquetado cuando npm está disponible.

**Capturas para el informe:** guardar en una carpeta `evidencias/` dentro del proyecto, con nombres `captura-01.png` a `captura-09.png`; luego reemplazar los recuadros de evidencia del documento Word con las capturas auténticas y su descripción.

**Antes de entregar:** instalar dependencias, ejecutar aplicación, realizar pruebas manuales, registrar versiones de Node.js e Ionic CLI, completar coevaluación, añadir logo institucional auténtico, profesor e integrantes y comprimir nuevamente el proyecto.
