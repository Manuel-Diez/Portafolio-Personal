# Centinela

Módulo de control de acceso en ASP.NET Core 8 — usuarios, roles,
vistas (pantallas del sistema), ciudades, y las relaciones entre roles
y vistas que definen qué puede ver cada rol. Usa EF Core y Dapper a la
vez dentro de la misma capa de datos: EF Core para las operaciones
transaccionales normales, Dapper para las consultas de solo lectura
más específicas. Se llamaba "ModuleSecurity", un nombre que prometía
algo que el proyecto, tal como estaba, no tenía en absoluto.

```bash
cd source/repos/Centinela/Web
dotnet run
# las migraciones de EF Core se aplican solas al arrancar
```

## El dominio, en detalle

Un `User` pertenece a una `Person`, y a través de `UserRole` puede
tener uno o varios `Role`. Cada `Role` tiene acceso a ciertas `View`
(pantallas) a través de `RoleView`. Es el modelo clásico de control de
acceso basado en roles (RBAC): en vez de darle permisos a cada usuario
uno por uno, se le asignan roles, y son los roles los que tienen
permisos sobre las vistas. `City` es una entidad de catálogo aparte
(para direcciones de personas), sin relación directa con el control de
acceso.

## El problema, con detalle

La ironía central del proyecto: se llamaba "módulo de seguridad" y no
tenía ninguna. `Program.cs` llamaba a `app.UseAuthorization()` sin que
existiera, en ningún archivo del proyecto, un solo
`AddAuthentication()`, configuración de JWT, ni un `[Authorize]` — es
decir, `UseAuthorization()` estaba activo pero no tenía ninguna
política que aplicar, así que en la práctica no bloqueaba nada:
cualquiera podía llamar cualquier endpoint sin credenciales de ningún
tipo. El login, además, nunca se conectó a nada: `UserData.GetByName`
estaba completamente implementado, pero ningún controlador ni servicio
lo llamaba — código muerto que sugería una intención de login que
nunca se terminó de cablear.

El CORS tenía un bug más sutil de lo que parece a primera vista:
`policy.WithOrigins("*")`. La API de ASP.NET Core distingue entre
`AllowAnyOrigin()` (que sí acepta cualquier origen) y `WithOrigins(...)`
(que compara el header `Origin` de la petición contra la lista literal
que se le pase). El asterisco pasado a `WithOrigins` **no se interpreta
como comodín** — se compara como el texto literal `"*"`, que ningún
navegador manda jamás como valor de `Origin`. El resultado es que la
política, escrita con la intención de permitir todo, en realidad
bloqueaba silenciosamente cualquier petición cross-origin real.

Más bugs de código muerto y de nombres: `IUserData.GetDataSelects()`
estaba declarado y lanzaba `NotImplementedException`, pero no lo
llamaba ningún controlador — era, además, un duplicado exacto de
`GetAllSelect()`, que sí funcionaba. `CityData.Delete` lanzaba el
mensaje `"Registro encontrado"` en el caso en que el registro **no**
se encuentra — al mensaje le faltaba la palabra "no", así que decía
exactamente lo contrario de lo que pasó. Y dos nombres mal escritos
que rompían la trazabilidad del código: la clase `RolViewBusiness`
(faltaba una "e") implementando `IRoleViewBusiness`, y el archivo
`IRoleViuwController` ("Viuw" en vez de "View") — quien buscara
"RoleView" en el proyecto no habría encontrado ninguno de los dos por
nombre.

De infraestructura: no había ninguna migración automática, así que en
una base de datos nueva cada primera petición fallaba con
`Unknown database` hasta correr `dotnet ef database update` a mano. Y
la solución arrastraba un proyecto `Diagram` (un modelo legado en
formato EF6/`edmx`, sin que ningún otro proyecto lo referenciara) más
un `Diagram.rar` suelto, y un proyecto `Utilities` completamente vacío
— ni un solo archivo `.cs` dentro.

## Por qué se resolvió así

Dado que el proyecto se llama, literalmente, "módulo de seguridad", la
prioridad no era una corrección cosmética sino construir la
autenticación que le da sentido al nombre: `POST /Auth/login` valida
usuario y contraseña con el mismo `PasswordHasher<User>` que ya se
usaba para *guardar* contraseñas (reutilizando lo que ya existía en
vez de introducir un segundo mecanismo de hashing), y devuelve un JWT
firmado con HMAC-SHA256. Sobre eso,
`app.MapControllers().RequireAuthorization()` exige ese token en todo
endpoint por defecto, y solo `AuthController` se marca
`[AllowAnonymous]` explícitamente — es la única ruta que, por
definición, tiene que ser accesible sin estar ya autenticado.

El CORS se corrigió a `AllowAnyOrigin()`, que es lo que la
configuración original claramente intentaba lograr con ese `"*"` mal
puesto. `GetDataSelects()` se eliminó en vez de implementarse: ya
existía `GetAllSelect()` haciendo exactamente lo mismo, y mantener dos
nombres para un mismo comportamiento es, con el tiempo, una fuente
garantizada de bugs cuando alguien actualice uno y se le olvide el
otro. Los nombres mal escritos se corrigieron
(`RoleViewBusiness`, `IRoleViewController`) actualizando también sus
referencias en `Program.cs` y en el controlador correspondiente, para
que el código sea buscable por el nombre del concepto que representa.

Se agregó `db.Database.Migrate()` al arranque porque un proyecto que
no puede levantarse en una máquina nueva sin pasos manuales
adicionales no está realmente terminado — y se confirmó viéndolo
funcionar: en una base de datos vacía, el arranque crea `CentinelaMysql`
y las siete tablas desde cero, sin intervención. `Diagram`,
`Diagram.rar` y `Utilities` se eliminaron de la solución y del disco
porque no aportaban nada y solo agregaban confusión sobre qué parte
del proyecto está realmente en uso.

## Cómo se verificó

Contra MySQL real, no solo compilado:

1. Arranque en limpio → EF Core crea la base y las tablas solo.
2. `GET /Role` sin token → 401.
3. `POST /Person` + `POST /User` (contraseña con hash real) para crear
   un usuario de prueba.
4. `POST /Auth/login` con contraseña incorrecta → 401.
5. `POST /Auth/login` con la contraseña correcta → 200 con un JWT.
6. `GET /Role` con `Authorization: Bearer <token>` → 200.

## Estructura

```
centinela/
└── source/repos/Centinela/
    ├── Entity/     modelos, DTOs, migraciones EF Core
    ├── Data/       acceso a datos (EF Core + Dapper)
    ├── Business/   lógica de negocio + AuthBusiness (login/JWT)
    └── Web/        controllers, Program.cs, appsettings.json
```
