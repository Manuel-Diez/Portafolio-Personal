# Talonario

Motor de facturación en Spring Boot con MySQL: clientes, productos,
facturas y el detalle de cada factura (qué producto, cuánta cantidad,
a qué precio), con el IVA, el stock y la numeración calculados en el
servidor, no en quien llama a la API. Se llamaba "Electronic_voice",
una traducción a medias de "factura electrónica" que se quedó pegada
al nombre del paquete Java. Talonario es, literalmente, lo que lleva
un negocio: el registro físico o digital de cada factura que emite.

Una aclaración importante antes de seguir: **esto no es un sistema de
facturación electrónica DIAN**. Es un motor de facturación interno
sólido. La diferencia entre las dos cosas está explicada al final de
este documento.

```bash
./mvnw spring-boot:run
# http://localhost:9000/talonario
```

## El dominio, en detalle

Un `Customer` compra; un `Product` tiene precio y stock; un `Bill`
(factura) pertenece a un cliente, tiene un número, una fecha de
emisión y de vencimiento, y un total; cada `InvoiceDetail` (línea de
factura) referencia un producto y una cantidad, y calcula su propio
subtotal, IVA y total. El total de la factura es la suma de los
totales de sus líneas — el mismo modelo relacional que cualquier
sistema de facturación necesita, pero antes de esta revisión ninguna
de las reglas que le dan sentido estaba implementada: existían las
tablas, no las cuentas.

## El problema, con detalle

**No tenía ninguna seguridad real, a pesar de traer
`spring-boot-starter-security` como dependencia declarada en el
`pom.xml`.** Esto es más grave de lo que suena a primera vista: cuando
Spring Boot detecta esa dependencia en el classpath pero no encuentra
ninguna clase de configuración de seguridad propia, activa su
seguridad por defecto — un único usuario llamado `user` con una
contraseña generada aleatoriamente en cada arranque, visible
únicamente en la consola del servidor. En la práctica, eso vuelve la
API inutilizable sin ir a leer los logs cada vez que se reinicia, y
totalmente inviable para cualquier cliente (un frontend, una app
móvil) que necesite un mecanismo de login estable.

**El motor no calculaba nada — se limitaba a guardar lo que le
mandaran.** Quien llamara `POST /InvoiceDetail` podía especificar
`unitPrice`, `subtotal`, `iva` y `total` con cualquier valor, y el
sistema los guardaba tal cual, sin compararlos contra el precio real
del producto en el catálogo. Es el mismo tipo de vulnerabilidad de
integridad que en Mostrador y Posada: cualquier sistema que maneja
dinero y confía en el cliente para calcularlo no está calculando nada,
está aceptando sugerencias.

**El stock de `Product` era decorativo.** Se podía facturar el mismo
producto un número ilimitado de veces sin que el inventario se
enterara — ni una validación de disponibilidad, ni un descuento al
vender.

**El número de factura lo elegía quien llamaba a la API.** El campo se
llamaba `voiceNumber` (una errata de traducción de "invoice number"
que quedó pegada al código), y como cualquier cliente podía mandar el
valor que quisiera, se podían crear facturas duplicadas o fuera de
orden — dos propiedades que en cualquier sistema de facturación real
son inaceptables por definición.

**La base de datos nunca se creaba sola.** `ddl-auto=update` le dice a
Hibernate que mantenga las *tablas* sincronizadas con las entidades,
pero no crea el *esquema* (la base de datos en sí) si no existe. En
una máquina nueva, cada arranque fallaba con `Unknown database` hasta
que alguien la creara manualmente con un cliente de MySQL.

**Dos configuraciones de CORS, ambas rotas y ambas innecesarias**:
`Corsconfig.allowedOrigins("")` con una cadena vacía inválida, y un
`CorsFilter` paralelo con el puerto de un frontend hardcodeado —
`@CrossOrigin` en cada controlador ya resolvía esto por sí solo, sin
necesitar ninguna de las dos.

**`ApiResponseDto` existía en el código pero no lo usaba nadie.**
Cualquier error de negocio (por ejemplo, un producto que no existe)
terminaba en la página de error HTML genérica de Spring Boot, con
código 500, en vez de una respuesta JSON que un cliente real pudiera
interpretar.

**Erratas que delatan que nadie releyó el código después de
escribirlo**: una tabla mapeada como `Profuct` en vez de `Product`, un
campo `descption` en vez de `description`, una columna `bii_id` en vez
de `bill_id`. Y, de fondo, `User` no tenía forma de iniciar sesión —
sin `username` ni `password`, el campo `rol` que sí traía la entidad
no tenía ningún login al cual aplicarse.

## Por qué se resolvió así

**La autenticación se construyó con JWT propio** (`AuthController` +
`JwtService` + `JwtAuthFilter` + `SecurityConfig`) en vez de configurar
Spring Security con un `UserDetailsService` tradicional, porque el
modelo de usuario ya existente (`User` con `rol`) no encajaba con las
abstracciones de `UserDetailsManager` sin una capa adicional de
traducción; escribir el filtro directamente fue más simple y más
transparente que adaptar el modelo a lo que Spring Security espera. Se
agregó, además, un `UserDetailsService` vacío únicamente para que
Spring Boot deje de generar el usuario aleatorio en cada arranque —
sin ese bean, la autenticación por defecto se sigue activando aunque
nunca se use.

**El cálculo de facturación se centralizó en el servidor**
(`InvoiceDetailService`): el precio unitario siempre sale del
`Product` guardado en la base de datos, nunca del cuerpo de la
petición; `subtotal`, `iva` (al 19%) y `total` se calculan ahí mismo,
y cada vez que un detalle se crea, edita o borra, se recalcula
también el total de la factura completa a la que pertenece. La razón
de recalcular en cada operación —y no solo al crear la factura— es que
una factura es un documento vivo hasta que se cierra: si se edita una
línea después de creada, el total tiene que reflejar ese cambio de
inmediato, no quedar desactualizado hasta la próxima consulta.

**El control de stock se implementó como parte del mismo flujo**: crear
un detalle valida que haya existencias suficientes antes de descontar,
y tanto editar como borrar un detalle devuelven el stock correctamente
— exactamente el mismo patrón de reserva/liberación que ya se había
resuelto en Estante para los préstamos de libros.

**La numeración de factura pasó a ser responsabilidad exclusiva del
servidor** (`Billservice`), asignando siempre el siguiente número
disponible. Se pensó como un número secuencial simple (no un UUID ni un
hash) a propósito: si algún día se decide avanzar hacia una
integración real con la DIAN, esa numeración tendrá que convertirse en
un rango autorizado por resolución — partir de una secuencia simple y
predecible hace ese camino más corto que si hoy se hubiera usado un
identificador arbitrario.

El resto de las correcciones son, cada una, la eliminación de algo que
sobraba o la reparación de algo puntualmente roto: `createDatabaseIfNotExist=true`
en la URL de conexión para que la base se cree sola; las dos
configuraciones de CORS rotas, eliminadas en favor de `@CrossOrigin`;
`ApiResponseDto` conectado a un `@RestControllerAdvice` para que los
errores de negocio vuelvan como JSON con el código HTTP correcto; las
erratas de nombres corregidas; y `User` con `username`/`password` reales,
con el hash marcado `@JsonProperty(WRITE_ONLY)` para que nunca salga en
una respuesta, y con la lógica de que una actualización sin contraseña
nueva conserva el hash existente en vez de sobrescribirlo con vacío.

## Cómo se verificó

Contra MySQL real, no solo compilado: arranqué en limpio y la base se
creó sola; pedí un recurso protegido sin token (401); me logueé con la
contraseña mala (401) y con la correcta (200 con token); creé un
producto con 5 unidades de stock y un cliente; armé una factura y le
agregué un detalle de 3 unidades — el total salió en 357.000
(100.000 × 3, más el 19% de IVA), el stock del producto bajó a 2, y el
total de la factura se actualizó solo a 357.000. Pedir 99 unidades más
del mismo producto devolvió un 400 con el mensaje
`"No hay stock suficiente de \"Teclado\" (disponible: 2)."`, no un 500.

## Sobre venderlo como facturación electrónica DIAN

Si la idea a futuro es ofrecer esto como "facturación electrónica" en
Colombia, hay que ser honesto sobre la distancia real que existe entre
lo que hay hoy y lo que exige la ley: Talonario es un buen motor de
facturación interno, pero estar habilitado por la DIAN es un proyecto
completamente distinto, y bastante más grande que cualquier cantidad
de código.

Para facturar electrónicamente hay que pasar primero por la
habilitación de la DIAN — como facturador electrónico directo, o (más
realista para un producto de software) como proveedor tecnológico
certificado — lo que implica un ambiente de pruebas donde el software
tiene que generar y transmitir un conjunto de facturas que la DIAN
valida una por una antes de autorizar producción. La factura en sí no
es un JSON de una API: tiene que generarse como XML siguiendo el
estándar UBL 2.1 con las extensiones del Anexo Técnico vigente, con un
CUFE calculado según una fórmula específica (NIT, fecha, valores,
número de factura, un código de seguridad del software — no un UUID
cualquiera), firmado digitalmente con un certificado calificado
(XAdES), y transmitido a los web services de la DIAN para recibir su
respuesta de aceptación o rechazo.

A eso se suma una representación gráfica en PDF con el CUFE y el QR
para quien no procesa XML; un rango de numeración autorizado mediante
una Resolución de Facturación (no numerar libremente desde 1, como
hace hoy Talonario); notas crédito y débito con su propio código,
enlazadas a la factura original; los eventos del receptor —acuse de
recibo, aceptación, reclamo— sin los cuales la factura electrónica no
llega a ser título valor; un mecanismo de contingencia para cuando los
sistemas de la DIAN o los propios fallan; las tarifas de IVA reales
(0%, 5%, 19%, bienes excluidos o exentos, y en algunos sectores el
impuesto al consumo — hoy Talonario usa un 19% fijo para todo);
retenciones según el tipo de negocio y de cliente; y la conservación
legal del documento (XML, PDF y eventos) por el término que exige la
ley, hoy cinco años. Si además esto se fuera a ofrecer a terceros como
servicio, entrarían también los términos legales y la Ley de
protección de datos.

En corto: lo que existe hoy es una base sólida y sincera —clientes,
productos, facturas con matemática correcta, control de stock, login
real— sobre la cual construir, el día que valga la pena, la
integración con la DIAN. Venderlo ya mismo como "facturación
electrónica DIAN" sin haber resuelto ninguno de los puntos anteriores
sería venderlo mal.

## Estructura

```
talonario/
└── src/main/java/com/talonario/
    ├── Entity/       Bill, Customer, InvoiceDetail, Product, User
    ├── Dto/          LoginRequestDto, AuthResponseDto
    ├── IRepository/  repositorios JPA (genérico + específicos)
    ├── IService/     contratos de servicio
    ├── Service/      Billservice, InvoiceDetailService, UserService...
    ├── Controller/   REST + AuthController
    ├── Config/       SecurityConfig, JwtService, JwtAuthFilter, GlobalExceptionHandler
    └── Utils/        ApiResponseDto, GlobalConstants
```
