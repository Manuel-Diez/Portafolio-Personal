# Backend de Sistema de Gestión Hotelera

Este proyecto implementa un backend completo para la gestión hotelera, desarrollado en **Spring Boot**. Permite el registro de usuarios, hoteles, habitaciones y la gestión de reservas y ventas.

## Descripción

Este sistema backend proporciona una API RESTful que permite:
- Autenticación y registro de usuarios
- Creación y gestión de hoteles
- Gestión de habitaciones con diferentes categorías y acomodaciones
- Asignación de habitaciones a hoteles
- Registro y gestión de ventas/alquileres

## Tecnologías utilizadas

- **Java 21**
- **Spring Boot 3.3.0**
- **PostgreSQL** (base de datos)
- **Maven** (gestión de dependencias)
- **Spring Security + JWT** (autenticación)
- **Spring Data JPA** (persistencia)
- **Lombok** (reducción de código boilerplate)

## Requisitos

Para ejecutar este proyecto necesitas:

- Java 21 o superior
- PostgreSQL
- Maven

## Configuración del proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Macruzt/Hotel.git
   cd Hotel
   ```

2. Configura la base de datos en `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/hoteleria
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Compila y ejecuta la aplicación:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

## Estructura de la API

Esto podra ser probado desde swagger http://localhost:9000/swagger-ui/index.html#
igualmente puede ser probado desde postman

### Gestión de Usuarios
Permite el registro y gestión de usuarios del sistema.

- **GET** `/api/users/{id}`: Obtiene un usuario por su ID
- **GET** `/api/users`: Obtiene todos los usuarios registrados
- **POST** `/api/users`: Registra un nuevo usuario
- **POST** `/api/users/login`: Autentica un usuario y devuelve un token JWT

### Gestión de Hoteles
Administración de los hoteles disponibles en el sistema.

- **GET** `/api/hotels/{id}`: Obtiene un hotel por su ID
- **GET** `/api/hotels`: Obtiene todos los hoteles
- **POST** `/api/hotels`: Registra un nuevo hotel

### Gestión de Habitaciones
Definición de tipos de habitaciones disponibles.

- **GET** `/api/rooms/{id}`: Obtiene una habitación por su ID
- **GET** `/api/rooms`: Obtiene todas las habitaciones
- **POST** `/api/rooms`: Registra una nueva habitación

### Asignación de Habitaciones a Hoteles
Permite asignar diferentes tipos de habitaciones a los hoteles registrados.

- **GET** `/api/hotel-rooms/{id}`: Obtiene una asignación por su ID
- **GET** `/api/hotel-rooms`: Obtiene todas las asignaciones de habitaciones
- **POST** `/api/hotel-rooms/asignar`: Asigna múltiples habitaciones a un hotel

### Gestión de Ventas
Registro y gestión de reservas y alquileres.

- **GET** `/api/sales/{id}`: Obtiene una venta por su ID
- **GET** `/api/sales`: Obtiene todas las ventas
- **POST** `/api/sales`: Registra una nueva venta

## Reglas de negocio

### Tipos de habitaciones y acomodaciones
- **Habitación Estándar**: Solo permite acomodación Sencilla o Doble
- **Habitación Junior**: Solo permite acomodación Triple o Cuádruple
- **Habitación Suite**: Solo permite acomodación Sencilla, Doble o Triple

## Seguridad

La API utiliza autenticación basada en JWT (JSON Web Tokens). Para acceder a los endpoints protegidos, es necesario incluir el token en el encabezado de autorización de las peticiones HTTP:

```
Authorization: Bearer {token}
```

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

