# Hoteles — guía rápida del frontend

Interfaz en React que consume la API de Posada: catálogo de hoteles y
habitaciones, gestión de usuarios, y reservas con el precio calculado
del lado del servidor (no acá, en el navegador).

## Para correrlo

Necesitas Node 24.1.0 y cualquier navegador.

```bash
npm install
npm start
```

Se abre solo en el navegador, apuntando al backend en el puerto que
tenga configurado `apiConstants.js`.

## Para entrar

Hay un usuario de prueba: `admin@gmail.com` / `admin123`.

## Cómo fluye una reserva

La pantalla inicial muestra el catálogo de hoteles y habitaciones sin
necesidad de iniciar sesión — es información pública. Para reservar,
hay que loguearse primero; una vez adentro, el menú de la izquierda da
acceso a:

- **Inicio** — información general del negocio
- **Usuarios** — dar de alta a quien vaya a usar el sistema
- **Hoteles** — registrar hoteles nuevos
- **Habitaciones** — agregarle habitaciones a cada hotel, con su tipo
  de acomodación
- **Reservas** — elegir persona, hotel, habitación y fechas de entrada
  y salida; el precio sale solo, multiplicando el valor de la
  habitación por las noches — no se puede escribir un precio a mano

Si algo no responde, lo más fácil es reiniciar la aplicación.
