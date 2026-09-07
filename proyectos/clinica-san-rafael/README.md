# Clínica San Rafael

Backend en Spring Boot con MySQL, frontend en HTML/CSS/JS con jQuery,
para el día a día de una clínica: pacientes, médicos y sus ingresos
(qué habitación y cama ocupan, y su estado — en observación o dado de
alta). Se llamaba "clinica-hospitalaria", un nombre genérico de
relleno; al rediseñar el frontend le puse la marca Clínica San Rafael
directamente en el sidebar y el título, y de ahí quedó el nombre para
todo lo demás.

```bash
# backend
cd Back-end/clinica && ./mvnw spring-boot:run

# frontend (estático, cualquier servidor sirve)
cd "Front-end/clinica Front-end" && python -m http.server 5501
# abrir http://localhost:5501/Pages/Dashboard.html
```

## El dominio, en detalle

Un `Paciente` puede tener uno o varios `Ingreso` a lo largo del
tiempo; cada ingreso queda a cargo de un `Medico`, ocupa una
habitación y una cama concretas, tiene una fecha de entrada y
(eventualmente) una de salida, y un estado. Pacientes y Médicos ya
funcionaban de punta a punta cuando revisé el proyecto — CRUD completo,
sin problemas. **Ingresos, la pieza que en realidad conecta todo lo
demás, no funcionaba en absoluto.**

## El problema, con detalle

**El formulario armaba un objeto que la API nunca podía entender.** El
JavaScript del frontend construía el cuerpo del `POST` con claves como
`petent`, `doctor`, `admission_date`, `doctor_id`, `patient_id` — ninguna
de las cuales existe en la entidad `Ingreso` real (que espera `paciente`,
`medico`, `admissionDate`, etc.). El formulario parecía capturar todos
los datos correctamente en pantalla, pero nada de eso llegaba nunca al
backend con el nombre que este esperaba.

**No existía forma de editar un ingreso ya creado.** El backend tenía
`POST` y `DELETE`, pero ningún `PUT` — si un paciente cambiaba de
habitación o el médico daba de alta, la única opción era borrar el
ingreso completo y crear uno nuevo, perdiendo la fecha original de
entrada.

**El campo Estado estaba comentado en el HTML**, a pesar de que la
base de datos lo declara `nullable = false`. El resultado: cualquier
intento de crear un ingreso desde el formulario fallaba de entrada,
porque el campo obligatorio nunca se enviaba.

**El selector de paciente y médico no seleccionaba nada.** Era un
modal con casillas de verificación que leía el id desde un atributo
`data-id` en JavaScript, pero el HTML del modal solo definía `value` —
nunca `data-id`. El id que llegaba al guardar era siempre `undefined`,
sin que hubiera ningún error visible que lo delatara.

**Un bug de copiar y pegar bien escondido**: el filtro de pacientes
(`PacienteIRepository.filterPatient`) hacía la consulta sobre la
entidad `Medico`, no sobre `Paciente` — probablemente copiado del
repositorio de médicos y nunca actualizado.

**Dos configuraciones de CORS, redundantes y las dos rotas**:
`CorsConfig.allowedOrigins("")` con una cadena vacía (inválida por
definición) y, en paralelo, un `CorsFilter` hardcodeado a un puerto
fijo. Ninguno de los dos hacía falta: cada controlador ya tenía
`@CrossOrigin`, que sí resolvía el problema por sí solo.

**Las fechas de ingreso y salida usaban `java.sql.Date`.** Esta clase
representa una fecha como un instante a medianoche en la zona horaria
por defecto de la máquina donde corre — así que, dependiendo de esa
configuración, guardar el 5 de septiembre puede terminar guardando el
4. Lo confirmé mandando una fecha real por la API y viendo qué quedaba
efectivamente en la base de datos: no era una suposición, se
reprodujo el corrimiento.

**Visualmente, arrastraba una plantilla de Bootstrap sin terminar**:
un logo roto apuntando a `path/to/logo.png` (literal, nunca se
reemplazó), una imagen de fondo llamada `Esquizofrenia.jpg` que además
le daba título a la pestaña del navegador, dos hojas de CSS con reglas
de ancho máximo contradictorias (`1500px` y `3000px`, una encima de la
otra), y un archivo JS completo (`Pages.js`) que no usaba ninguna
página.

## Por qué se resolvió así

El arreglo de fondo fue reescribir `Ingreso.js` con los nombres de
campo reales, y reemplazar el modal de casillas por `<select>`
normales cargados desde la API. La razón de este segundo cambio no es
solo estética: un `<select>` con `<option value="{id}">` garantiza que
el id que se envía es exactamente el que el HTML declara, sin depender
de un atributo adicional (`data-id`) que hay que recordar sincronizar
a mano en dos lugares distintos. Es una clase de bug que un `<select>`
hace estructuralmente imposible.

Se agregó el `PUT /ingresos/{id}` que faltaba (interfaz, servicio y
controlador) con la misma validación de "Estado no puede quedar
vacío" que ya tenían Paciente y Médico — por consistencia con el resto
de la API, no una regla nueva. El campo Estado dejó de estar comentado
y pasó a ser un selector real con las dos opciones válidas del dominio.

Las fechas se migraron de `java.sql.Date` a `java.time.LocalDate`
porque `LocalDate` no tiene ninguna noción de hora ni de zona horaria
— representa un día calendario y nada más, así que la clase entera de
bug del desfase de un día deja de ser posible, no solo de ocurrir en
este caso puntual. `CorsConfig` y `CorsFilter` se eliminaron en vez de
arreglarse, porque `@CrossOrigin` ya resolvía el problema real; mantener
dos mecanismos redundantes para lo mismo solo deja abierta la duda de
cuál política aplica realmente.

El frontend se rediseñó por completo con un sistema de diseño propio
(`Asset/css/clinica.css`): paleta azul y verde — la que casi cualquier
interfaz clínica usa, porque transmite calma y limpieza — tipografía
Figtree y Noto Sans, sidebar fijo con estado activo, tarjetas, badges
de estado con color según su significado, y una página de Inicio nueva
con contadores en vivo. Antes el panel arrancaba completamente en
blanco hasta que alguien hacía clic en algo; con los contadores, quien
abre el sistema ve de entrada cuántos pacientes, médicos e ingresos
activos hay, sin tener que navegar a buscarlo.

## Verificado

Backend probado con MySQL real, no solo compilado: crear paciente,
médico e ingreso, filtrar pacientes, y el `PUT` nuevo de ingreso — los
tres end-to-end por HTTP. El frontend se probó en el navegador de
verdad, no solo leyendo el código: se levantó el backend y el sitio
estático juntos, y se creó y editó un ingreso completo a través de la
interfaz — selects, fechas, badges y la tabla actualizándose en vivo,
todo funcionando.

## Estructura

```
clinica-san-rafael/
├── Back-end/clinica/                  Spring Boot + MySQL (paquete com.clinicasanrafael)
└── Front-end/clinica Front-end/
    ├── Pages/                          Dashboard, Home, Paciente, Medico, Ingreso
    └── Asset/
        ├── css/clinica.css             Sistema de diseño único
        └── js/                         Pacientes.js, Medico.js, Ingreso.js
```
