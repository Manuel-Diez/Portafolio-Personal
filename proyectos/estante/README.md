# Estante

Backend en Spring Boot con MySQL para los préstamos de una biblioteca:
usuarios, libros, préstamos y las multas que se generan por atraso.
Antes se llamaba "Andorid" — con esa errata, y sin que tuviera nada que
ver con Android — ahora es Estante, porque de ahí es de donde sale y a
donde vuelve cada libro.

```bash
./mvnw spring-boot:run
```

## El dominio, en detalle

Un `User` puede pedir prestado un `Book` si hay ejemplares disponibles
(`stock`); ese préstamo (`Loan`) tiene una fecha límite de devolución;
si se devuelve tarde, se genera una `Penalty` con el monto de la multa
calculado según los días de atraso. Es el ciclo de vida completo de un
préstamo de biblioteca: pedir, devolver a tiempo o tarde, y en ese
segundo caso, pagar. Antes de esta revisión, el proyecto tenía las
cuatro entidades pero ninguna de las reglas que las conectan.

## El problema que tenía

Era, en el fondo, un CRUD genérico (`ObjectTController<T>` /
`ObjectTService<T>`) sin una sola regla de negocio de biblioteca
puesta en marcha:

**El stock no se movía.** `Book.stock` y `borrowedBooks` eran de tipo
`String`, no números — lo que ya de entrada hace imposible comparar
"¿hay ejemplares disponibles?" sin parsear el texto primero, y en la
práctica nadie lo hacía: prestar un libro no bajaba el contador,
devolverlo no lo subía. Un libro con un único ejemplar se podía
prestar simultáneamente a diez personas distintas sin que el sistema
lo notara.

**No existían las multas.** Se podía devolver un libro cinco meses
tarde sin que quedara ningún registro de la demora — la entidad
`Penalty` existía en el modelo, pero nada la creaba nunca.

**El "login" no validaba nada de verdad.** El endpoint era
`GET /User/UserDto/{id}`: un simple `SELECT` por id, sin pedir ni
comparar ninguna contraseña — cualquiera que supiera o adivinara el id
de otro usuario "entraba" como esa persona. Y encima tenía un bug de
binding: el método esperaba el id con `@RequestParam` (que lee de la
cadena de consulta, `?id=1`), pero la ruta lo declaraba como variable
de path (`{id}`, que se lee con `@PathVariable`) — dos mecanismos de
Spring MVC que no son intercambiables, así que ni siquiera el id
llegaba correctamente.

**`Penalty` tenía dos campos casi idénticos**: `finevalue` (`Double`,
el monto de la multa) y `fineValue` (`LocalDate`, la fecha) — se
diferencian solo por una mayúscula en medio del nombre, una receta
perfecta para que alguien confunda uno con el otro sin que el
compilador se queje.

**La columna `password` era `varchar(20)`.** Ni siquiera alcanza para
una contraseña larga en texto plano, y un hash de BCrypt —que es lo
que de verdad hay que guardar— ocupa 60 caracteres exactos. Esto lo
confirmé probándolo: al intentar guardar el hash real, la base de
datos lo rechazaba con una violación de integridad.

**Los errores de negocio salían como un 500 con el stack trace
completo** expuesto a quien llamara la API — sin stock disponible, sin
registro encontrado, cualquier cosa, todo terminaba en la misma
página de error genérica de Spring.

## Por qué se resolvió así

El stock pasó a `int` porque es, sencillamente, lo que es: una
cantidad. Con eso resuelto, `LoanService` pudo implementar la regla
real de una biblioteca — al crear un préstamo, valida que
`stock > 0` y lo descuenta; al marcarlo como devuelto o cancelado, lo
repone. La generación de multas se hizo automática (calculando los
días de atraso entre la fecha límite y la fecha real de devolución) en
vez de un endpoint aparte que alguien tendría que recordar llamar,
porque en una biblioteca real la multa es una consecuencia del atraso,
no una acción manual separada que un empleado decide tomar.

Para el login, se optó por `spring-security-crypto` (el hasher de
BCrypt) en vez de traer la librería completa de Spring Security: el
proyecto no necesitaba sesiones, roles ni un filtro de autenticación
completo — solo una forma correcta de guardar y verificar contraseñas.
El endpoint viejo se dejó, pero renombrado a lo que en realidad
siempre fue: un resumen de usuario por id (`GET /User/summary/{id}`),
con el bug de binding corregido a `@PathVariable`.

`Penalty` se renombró a `fineAmount`/`fineDate` porque un nombre que
solo se diferencia de otro por una letra es, tarde o temprano, un bug
esperando a pasar. La columna de contraseña se amplió a `varchar(100)`
para tener margen sobre los 60 caracteres exactos de un hash de
BCrypt. Y el controlador genérico ahora atrapa las excepciones de
negocio y responde 400 con un mensaje claro, porque un stack trace
completo no le sirve a quien consume la API — le sirve, en el peor
caso, a alguien tratando de entender cómo está armado el sistema por
dentro.

## Cómo se verificó

Contra MySQL real, no solo compilado: se creó un usuario con
contraseña hasheada, se probó el login con la contraseña correcta e
incorrecta, se prestó un libro con stock 1 (bajó a 0), se confirmó que
un segundo préstamo del mismo libro se rechaza con un 400 claro, y al
marcar el préstamo como devuelto con nueve días de atraso se generó
automáticamente una multa de $9.000 — con el stock del libro de vuelta
en 1.
