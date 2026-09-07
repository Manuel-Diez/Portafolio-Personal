# Cómo instalar y correr el proyecto

El enunciado original pedía desplegar en la nube y entregar un dump de
base de datos listo para instalar. Nada de eso existía. Esto es lo que
hay ahora — instalación local con un solo comando, más la ruta para
llevarlo a la nube.

## Instalación local (con Docker)

Requisito único: tener [Docker](https://www.docker.com/) instalado.

```bash
docker compose up --build
```

Eso levanta tres contenedores:

| Servicio | Puerto | Qué es |
|---|---|---|
| `db` | 5432 | PostgreSQL, con un volumen para que los datos sobrevivan a reinicios |
| `backend` | 9000 | La API de Spring Boot |
| `frontend` | 3000 | El sitio de React, ya compilado y servido por nginx |

No hace falta correr ningún script de base de datos aparte: al arrancar,
el backend crea el esquema automáticamente (`ddl-auto=update`) y siembra
un usuario administrador por defecto (`admin@gmail.com` / `admin123`,
ver `DataInitializer.java`) — ese es el "dump listo para instalar" que
pedía el enunciado, resuelto sin depender de un archivo `.sql` suelto
que se puede desincronizar del código.

Con los contenedores arriba: `http://localhost:3000` es el sitio,
`http://localhost:9000/api` es la API, `http://localhost:9000/swagger-ui.html`
es la documentación interactiva.

## Instalación local (sin Docker)

1. Instalar PostgreSQL y crear una base de datos `posada`.
2. Backend: `cd Codificacion/Back-End/posada && ./mvnw spring-boot:run`
   (usa `DB_USERNAME`/`DB_PASSWORD` como variables de entorno si la
   base de datos no es `postgres`/`postgres`).
3. Frontend: `cd Codificacion/Front-End/posada && npm install && npm start`

## Llevarlo a la nube

El `Dockerfile` de cada lado ya deja el proyecto listo para cualquier
plataforma que despliegue contenedores (Render, Railway, Fly.io) —
todas tienen un plan gratuito y toman el `Dockerfile` directamente sin
configuración adicional más allá de apuntar las variables de entorno
(`DB_USERNAME`, `DB_PASSWORD`, `SPRING_DATASOURCE_URL`) a la base de
datos que la plataforma provisione. Eso sí requiere una cuenta en el
proveedor elegido, así que ese último paso queda pendiente de que se
decida cuál usar.
