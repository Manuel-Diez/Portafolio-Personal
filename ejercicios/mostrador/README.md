# Mostrador

Backend en Spring Boot con MySQL para un punto de venta: clientes,
productos, ventas, y las líneas de cada venta (qué producto, cuánta
cantidad, a qué precio). CRUD completo sobre las cuatro entidades más
la lógica de cálculo que un punto de venta necesita para ser confiable.
Antes vivía en una carpeta llamada "prueba", bajo el paquete
`com.prueba.prueba` (repetido dos veces sin ninguna razón visible).
Mostrador es, literalmente, el lugar de una tienda donde se atiende al
cliente y se cierra la venta.

```bash
./mvnw spring-boot:run
```

## El dominio, en detalle

Un `Cliente` compra; un `Producto` tiene precio y stock; una `Venta`
pertenece a un cliente y agrupa una o más líneas
(`DescripcionVentas`); cada línea referencia un producto, una
cantidad, un descuento y sabe calcular su propio subtotal. El total de
una venta es la suma de los totales de sus líneas. Es el modelo
relacional estándar de cualquier punto de venta, pero antes de esta
revisión ese modelo no estaba realmente implementado — existían las
tablas, pero no las relaciones ni los cálculos que le dan sentido.

## El problema que tenía

Lo que había era un ejercicio de práctica de CRUD con Spring Data JPA,
y los bugs que arrastraba eran justo los que aparecen cuando se prueba
cada endpoint por separado pero nunca el flujo completo de una venta:

**El filtro de clientes por nombre fallaba en tiempo de ejecución.**
La consulta estaba anotada como SQL nativo (`nativeQuery = true`), lo
que le dice a Spring Data que no traduzca nombres de atributo a
columnas: pase la cadena tal cual al motor de base de datos. Pero esa
cadena estaba escrita con sintaxis de JPQL (el nombre del atributo Java,
`nombresCliente`), no con el nombre real de la columna
(`nombres_cliente`). El resultado es una consulta que MySQL no
reconoce.

**Los `POST`/`PUT` de Ventas y líneas de venta no recibían el cuerpo
del request.** Los controladores importaban `@RequestBody` del paquete
de Swagger (`io.swagger...`) en vez del de Spring
(`org.springframework.web.bind.annotation`). Ambas anotaciones se
llaman igual, así que el error no lo marca el compilador — pero la de
Swagger solo sirve para documentación, no le dice a Spring MVC que
debe deserializar el JSON en ese parámetro. El síntoma no es un error:
el parámetro simplemente llega vacío, y hay que darse cuenta de que el
objeto guardado no tiene ninguno de los datos que se mandaron.

**El controlador de líneas de venta tenía un error de copiar y
pegar**: se llamaba `DescripcionDescripcionVentasController` (el nombre
duplicado) y ni siquiera era `public` — quedó así, evidentemente, de
copiar un controlador existente y no terminar de renombrarlo.

**No existía relación entre una venta y sus líneas.** Cada línea de
`DescripcionVentas` apuntaba directo al cliente, sin pasar por la
venta. Eso significa que, aunque se pudieran crear ventas y líneas por
separado, no había ninguna forma de consultar "qué productos
pertenecen a esta venta" — el dato más básico que un punto de venta
necesita mostrar en un recibo.

**El total no se calculaba, se aceptaba.** El campo `total` de una
venta era de tipo `String`, y el `subTotal` de cada línea lo mandaba
quien llamara a la API sin que el servidor lo verificara contra el
precio real del producto. Cualquiera podía facturar lo que quisiera al
precio que quisiera.

**Varias columnas que no tienen por qué ser únicas** (`cantidad`,
`precio`, `porcentaje_iva`, `subTotal`) estaban marcadas
`unique = true` — dos productos con el mismo precio, o dos ventas con
el mismo subtotal, habrían roto la base de datos con una violación de
restricción.

**Las rutas venían duplicadas**: cada controlador repetía
`"prueba/..."` en su `@RequestMapping`, mientras `application.properties`
ya agregaba ese mismo prefijo por `context-path` — las URLs reales
quedaban como `/prueba/prueba/clientes`.

## Por qué se resolvió así

El cambio de fondo es que **una venta pasó a tener líneas de verdad**,
en vez de líneas sueltas apuntando al cliente: `DescripcionVentas`
ahora referencia a `Ventas`, porque sin esa relación no hay forma de
reconstruir un recibo ni de saber qué se vendió en cada transacción —
es el dato mínimo indispensable de un punto de venta.

El subtotal y el total se recalculan siempre en el servidor
(`subTotal = (precio - descuento) × cantidad`, `total` = suma de los
subtotales de la venta) porque un punto de venta que confía en el
precio que le manda el cliente no es un punto de venta, es una
sugerencia. Este recálculo ocurre cada vez que se crea, edita o borra
una línea — no solo al crear la venta — para que el total nunca quede
desactualizado. Por eso `total` pasó de `String` a `Double`: no se
puede sumar ni validar un número que está guardado como texto.

El resto de las correcciones (la consulta nativa, el import correcto
de `@RequestBody`, el nombre y visibilidad del controlador, las
restricciones `unique` quitadas de columnas que no debían tenerlas, las
rutas sin duplicar) eran, cada una, un bloqueo puntual que impedía usar
el sistema — se corrigieron porque sin ellas ni siquiera se podía
llegar a probar la lógica de negocio. Las credenciales de base de datos
se movieron a variables de entorno (`${DB_USERNAME:root}` /
`${DB_PASSWORD:}`) porque no hay razón para que una contraseña, aunque
sea de desarrollo, quede escrita en el código fuente.

## Verificación

Se probó de punta a punta contra una base de datos MySQL real, no solo
compilando: crear un cliente, un producto, una venta, y varias líneas
de venta — confirmando en cada paso que el subtotal y el total se
calculan y actualizan correctamente, incluida la recalculación al
borrar una línea.

## Estructura

```
mostrador/
├── pom.xml
└── src/main/java/com/mostrador/
    ├── MostradorApplication.java
    ├── Controller/     4 controladores REST
    ├── Service/        lógica de negocio, incluido el cálculo de totales
    ├── IService/ + IRepository/  contratos
    ├── entity/         Clientes, Productos, Ventas, DescripcionVentas
    └── utils/          ApiResponseDto, GlobalConstants
```
