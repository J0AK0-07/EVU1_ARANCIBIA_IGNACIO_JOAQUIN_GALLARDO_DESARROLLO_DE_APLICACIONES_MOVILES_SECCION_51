# TareaClara — Evaluación sumativa Unidad 1

**Asignatura:** Desarrollo de Aplicaciones Móviles  
**Integrantes:** Ignacio Arancibia Arce y Joaquín Gallardo  
**Tecnologías:** Ionic Framework 9, React 19, TypeScript, HTML, CSS y Node.js.  
**Plantilla de referencia:** proyecto Ionic `blank` (una página inicial); se agregó una segunda página informativa y navegación.

## Instalación y ejecución

1. Instala Node.js (versión 22 LTS o compatible) y verifica con `node -v` y `npm -v`.
2. Instala Ionic CLI: `npm install -g @ionic/cli`.
3. Abre una terminal en esta carpeta, donde está `package.json`.
4. Ejecuta `npm install` (requiere internet).
5. Ejecuta `ionic serve` y visita `http://localhost:8100`. Como alternativa usa `npm run dev`.
6. Para comprobar el empaquetado: `npm run build`.
7. Para ejecutar las pruebas de la lógica (Node.js 22+): `npm run test:logic`.

> Nota para la evaluación: este ZIP contiene el código fuente completo, pero **no** incluye `node_modules`, porque se regenera con `npm install`. La instalación y la prueba de compilación requieren acceso al registro npm.

## Funcionalidades

- Crear tarea con título y descripción obligatorios (ambos mediante `IonInput`).
- Ver la lista, editar y eliminar una tarea identificada por ID único.
- Confirmación antes de eliminar y mensajes de acción.
- Marcar tareas como completadas o pendientes.
- Filtrar tareas (todas, pendientes, hechas) y ver un resumen numérico.
- Validación de campos y limpieza del formulario tras guardar.
- Menú lateral y navegación entre tareas e información de uso.
- Diseño adaptable a móvil y escritorio.

## Archivos principales

- `src/App.tsx`: contenedor Ionic, menú lateral y rutas.
- `src/pages/TasksPage.tsx`: vista principal con lista, filtros, botones y confirmación.
- `src/pages/AboutPage.tsx`: guía del usuario y navegación.
- `src/components/TaskModal.tsx`: formulario reutilizable para agregar y editar.
- `src/context/TasksContext.tsx`: estado compartido y operaciones CRUD.
- `src/lib/taskLogic.ts`: validaciones y funciones puras.
- `src/models/Task.ts`: modelo de datos tipado.
- `src/theme/`: estilo, diseño adaptable y tema.
- `tests/taskLogic.test.ts`: pruebas automatizadas de las operaciones.

## Arquitectura y patrones

- **Componentes:** las páginas y el formulario son componentes React independientes.
- **Flujo unidireccional:** la interfaz consume el estado en `TasksContext`; las acciones actualizan el estado y React vuelve a renderizar.
- **Context + Provider:** patrón de estado compartido con `TasksProvider` para conservar las tareas al cambiar de ruta.
- **Funciones puras e inmutabilidad:** `taskLogic.ts` usa `map`, `filter` y arreglos nuevos, sin mutar las tareas.
- **Reutilización:** `TaskModal` funciona en modo agregar o editar.
- **Enrutamiento:** `IonReactRouter`, `IonRouterOutlet` y `Route` definen las pantallas.
- **Patrón contenedor/presentación:** `TasksPage` coordina acciones y `TaskModal` presenta el formulario.

## Alcance y limitaciones

Las tareas se mantienen **únicamente en la memoria de la sesión**. Al recargar, se restablecen. El enunciado reserva persistencia local, autenticación y consumo de APIs para unidades posteriores. No se ha incluido un backend.

La aplicación requiere una instalación real, capturas de pantalla auténticas y una prueba final en el equipo del alumno antes de su entrega. Ver `PRUEBAS_Y_EVIDENCIAS.md`.

## Nota de transparencia

El código fue preparado como entrega base; en el entorno de elaboración no se tuvo acceso al registro npm, de modo que no fue posible descargar dependencias ni ejecutar `ionic serve` o `npm run build`. **No se declara validación de compilación ni de interfaz hasta ejecutar los comandos anteriores.**

## Equipo y coevaluación

**Integrantes de la entrega:** Ignacio Arancibia Arce y Joaquín Gallardo. El equipo debe completar la coevaluación con sus contribuciones reales y adjuntarla a la entrega conforme a las instrucciones del docente. No se han asignado actividades individuales sin verificarlas.
