I'll help you format this content in markdown. Here's the formatted version:

# VetCare - Gestión de Citas Veterinarias

## Información del Equipo

### Nombres Estudiantes
- Carrillo Juan
- Espinoza Mateo
- Pilco Joselyn
- Toala Ismael

### Fecha
07/06/2025

## Detalles Técnicos
**Stack:** Node.js + Express + HTML/CSS/JS + Socket.IO  
**Modalidad:** Aplicación monolítica con WebSocket y base de datos relacional/noSQL

## Objetivo General
Desarrollar una aplicación web monolítica que permita a una veterinaria gestionar las citas de atención de mascotas, mantener comunicación en tiempo real con los clientes y administrar eficientemente los turnos y consultas mediante una interfaz sencilla y moderna.

## Historias de Usuario

| ID | Como... (rol) | Quiero... (acción) | Para... (beneficio) |
|----|---------------|-------------------|-------------------|
| HU01 | Cliente | registrar una cita para mi mascota | asegurar que reciba atención veterinaria |
| HU02 | Cliente | ver el estado de mis citas (pendiente, en curso, completada) | saber si la cita está confirmada o ya fue atendida |
| HU03 | Cliente | comunicarme en tiempo real con el veterinario | resolver dudas sobre la cita o tratamiento |
| HU04 | Veterinario | ver todas las citas registradas | planificar mi jornada de atención |
| HU05 | Veterinario | cambiar el estado de una cita | marcarla como completada o iniciada |
| HU06 | Veterinario | responder mensajes del cliente en el chat | mantener una comunicación fluida |
| HU07 | Administrador | consultar estadísticas de atención | evaluar el rendimiento y volumen de trabajo |

## Capabilities

| Capacidad | Descripción |
|-----------|-------------|
| Gestión de Citas | Registrar, listar, modificar y actualizar el estado de las citas veterinarias |
| Comunicación en Tiempo Real | Enviar y recibir mensajes entre cliente y veterinario usando WebSocket |
| Autenticación Básica | (Opcional) Identificación del cliente por nombre o correo para distinguir usuarios |
| Almacenamiento Persistente | Base de datos para guardar citas, mascotas y mensajes |
| Interfaz Web | Sistema accesible desde navegador con diseño adaptable y responsivo |