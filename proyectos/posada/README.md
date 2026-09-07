# Posada

Sistema de reservas de hotel de punta a punta: Spring Boot y
PostgreSQL en el backend, React en el frontend. Nació de una prueba
técnica real (Hoteles Decamerón de Colombia — el enunciado completo
está en `Documentacion/PRUEBA FULLSTACK.pdf`) que pedía poder registrar
hoteles, definir tipos de habitación con reglas de acomodación válidas,
y vender o reservar habitaciones respetando la disponibilidad real. Se
llamaba simplemente "Hotel"; Posada es más propio de lo que hace.

```bash
docker compose up --build
```
(la guía completa está en [`Documentacion/DESPLIEGUE.md`](Documentacion/DESPLIEGUE.md))

## El dominio, en detalle

Un `Hotel` tiene varios `HotelRoom` (tipos de habitación con su
acomodación válida — sencilla, doble, etc.), y cada `HotelRoom`
referencia un `Room` genérico con su precio. Una `Sale` es una reserva:
un cliente, un `HotelRoom`, un rango de fechas, y un precio total que
depende de cuántas noches se queden. Antes de esta revisión, casi
ninguna de esas relaciones se comportaba de forma confiable — el
modelo estaba, pero las reglas que lo hacen funcionar como un sistema
de reservas real no.

## Lo que pedía la prueba y lo que realmente había

El enunciado pedía, entre otras cosas, seguridad real, la aplicación
desplegada en la nube con su link, un dump de base de datos listo para
instalar, y buenas prácticas de código. Nada de eso se cumplía cuando
lo revisé:

**La seguridad estaba construida, pero apagada.** Había JWT completo
— login, filtro, validación de token — pero `SecurityConfig` terminaba
con `.anyRequest().permitAll()`. Es decir: todo el trabajo de
autenticación existía en el código, pero la última línea de
configuración lo anulaba por completo, dejando cada endpoint accesible
sin token. Es el tipo de bug que un test manual rápido no detecta,
porque el login "funciona" — lo que no se nota es que también funciona
sin loguearse.

**El precio de una reserva lo inventaba el navegador.** No existía un
campo `price` en ninguna habitación del lado del backend; el frontend
tenía una tabla de precios fija hardcodeada en JavaScript, y el
servidor aceptaba sin más el `totalPrice` que el cliente le mandara en
el body. Cualquiera con las herramientas de desarrollador del
navegador podía reservar una suite presidencial al precio de una
habitación sencilla.

**No había control de disponibilidad por fecha.** Al vender una
habitación se restaba 1 a una cantidad global de unidades disponibles
que nunca se recuperaba — ni cuando la reserva terminaba, ni cuando se
cancelaba. A la quinta venta, esa habitación quedaba "agotada para
siempre", sin importar que las reservas fueran de fechas que ni
siquiera se cruzaban entre sí. Un sistema de hotel necesita saber
cuántas unidades están ocupadas *en un rango de fechas dado*, no cuántas
se han vendido alguna vez en la historia.

Además: el JWT expiraba a los 24 minutos en vez de a las 24 horas
(faltaba multiplicar por 60 en el cálculo de expiración).
`User.getUsername()` devolvía siempre una cadena vacía. Un hotel
duplicado (mismo nombre o NIT) tiraba un error 500 crudo de SQL en vez
de un mensaje entendible. Y, de fondo, **el proyecto no compilaba en
el JDK de esta máquina**: Lombok, incluso actualizado a su versión más
reciente (1.18.48), no generaba código bajo este entorno, así que
`@Data`, `@Builder` y `@AllArgsConstructor` no producían absolutamente
nada, y cualquier clase que dependiera de un getter o setter generado
por Lombok simplemente fallaba al compilar. Y por supuesto, no había
despliegue, ni dump de base de datos, ni instructivo real — los tres
requisitos explícitos de la prueba.

## Por qué se resolvió así

`SecurityConfig` se reescribió para exigir JWT en todo excepto el
catálogo público (hoteles, habitaciones) y las rutas de login/registro
— exactamente la misma separación que ya existía del lado del
frontend, en `apiConstants.js`, solo que nunca se había aplicado en el
servidor. No hacía falta inventar la política de seguridad, solo
implementarla donde en realidad importa.

Para el precio, se agregó un campo `price` real a `Room` (el precio
depende del tipo de habitación, no del hotel en general) y
`SaleService` calcula `totalPrice = precio × noches` del lado del
servidor — lo que mande el cliente en ese campo se ignora por
completo. La razón es la misma en todo sistema que maneja dinero: el
cliente puede sugerir, pero nunca decidir, cuánto cuesta algo.

Para la disponibilidad, se reemplazó el contador global por una
consulta que cuenta cuántas reservas *ya existentes* se cruzan con el
rango de fechas pedido, y compara ese número contra cuántas unidades
tiene esa habitación en ese hotel. Es el modelo que de verdad usa un
hotel: una habitación vuelve a estar disponible en cuanto pasa la
fecha de salida de la reserva anterior, sin importar cuántas veces se
haya vendido antes.

Sobre Lombok: en vez de intentar forzar el entorno a que funcionara
(cambiar de JDK, tocar la configuración del IDE), se optó por
quitarlo del todo y reescribir a mano los getters, setters y
constructores de las cerca de veinte clases que dependían de él. Es
más código visible en el repositorio, pero el proyecto compila en
cualquier máquina sin depender de que un procesador de anotaciones se
comporte igual en todos lados — para un proyecto de portafolio que
otra persona va a clonar y correr, esa garantía vale más que las
líneas que Lombok ahorraba.

Se agregaron pruebas que antes no existían (`SaleServiceTest`, contra
H2 en memoria) apuntadas justo a la lógica que el proyecto no
demostraba tener: cálculo de precio, rechazo de reservas superpuestas,
aceptación de reservas en fechas libres, validación de fechas
inválidas. Y para el despliegue se armó un `Dockerfile` por cada lado
más un `docker-compose.yml` que levanta los tres servicios (PostgreSQL
incluido) con un solo comando — con el detalle en
`Documentacion/DESPLIEGUE.md`, incluyendo el camino honesto hacia una
nube real, que quedó pendiente de decidir plataforma.

De paso: expiración del JWT corregida a 24 horas, `getUsername()`
devuelve el email real, un hotel duplicado responde 400 con mensaje
claro en vez de 500 crudo, las credenciales de base de datos salieron
del código hacia variables de entorno, y las dependencias sueltas que
no se usaban (un driver de SQL Server, dos librerías de Swagger a la
vez, ModelMapper sin una sola referencia en todo el código) se
quitaron del `pom.xml`.

## Verificado

`mvn compile` limpio y los 5 tests de `SaleServiceTest` pasan,
incluido el arranque completo del contexto de Spring con seguridad,
JPA y JWT juntos funcionando a la vez. El frontend se revisó por
inspección directa del código — no llegué a correr `npm start` en esta
sesión por tiempo, así que antes de darlo por cerrado del todo vale la
pena probarlo a mano una vez.

## Pendiente

- Las URLs de la API están repetidas y hardcodeadas en varios archivos
  del frontend en vez de usar `apiConstants.js` de forma consistente
  (`rent.jsx` y `hotelRegister.jsx` no lo usan todavía).
- Falta desplegarlo de verdad en una nube (Render, Railway, Fly.io) —
  técnicamente ya está listo con el Dockerfile, solo falta la cuenta y
  decidir dónde.
