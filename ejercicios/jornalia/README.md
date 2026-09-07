# Jornalia

Aplicación de consola en .NET 8 / C# que calcula cuánto se le debe
pagar a un empleado en un mes dado, prorrateando su salario según los
días que realmente trabajó. Se llamó "Examen" y después
"CalculadoraNomina" antes de quedar como Jornalia — por "jornal": el
pago que corresponde por los días de trabajo efectivos, que es
exactamente la idea que resuelve el programa.

```bash
dotnet run --project Jornalia
```

## Qué hace, con detalle

El programa pide por teclado los datos de un empleado — nombre, edad,
dirección, teléfono, salario mensual pactado y días trabajados en el
mes — y a partir de ahí calcula el pago real. La regla de negocio es
simple pero real: un empleado casi nunca trabaja el mes calendario
completo (entra a mitad de mes, se incapacita unos días, etc.), así que
pagarle el salario mensual completo sin más sería incorrecto. El
cálculo es `salario mensual ÷ 30 × días trabajados`.

Ese mismo cálculo se ofrece de dos formas: síncrona (inmediata) y
asíncrona, simulando con `Task.Delay` una espera de dos segundos como
si el programa tuviera que consultar un sistema externo de nómina
antes de confirmar el pago. La idea es mostrar que la misma lógica de
negocio puede exponerse sin bloquear el hilo principal cuando la fuente
del dato no es instantánea.

No quedó guardado ningún enunciado original del ejercicio, pero se
reconstruye con claridad a partir de lo que el código exige y valida:
es un ejercicio pensado para demostrar herencia, interfaces, los cinco
principios SOLID y `async`/`await`, todos sobre un caso de negocio
pequeño pero no trivial.

## El problema que tenía

El código ya calculaba el prorrateo correctamente, pero fallaba en un
punto muy concreto: el teléfono del empleado se guardaba como `int`. Un
celular colombiano casi siempre empieza por 3 (por ejemplo
`3001234567`), y ese número —como valor entero— supera los
2.147.483.647 que permite un `Int32`. El programa no fallaba con
cualquier teléfono de prueba corto, pero sí con un número de celular
real de 10 dígitos, que es justamente el caso que un empleado real va
a escribir. Lo encontré probándolo con un número real, no leyendo el
código: compilaba y corría sin quejarse hasta ese punto exacto.

Aparte de eso, el repositorio traía dos carpetas sueltas (`Person/`,
`Proyecto/`) que eran un borrador viejo y un stub vacío, ninguno
referenciado por la solución — ruido que no aportaba nada y confundía
sobre cuál era el proyecto real.

## Por qué se resolvió así

Un teléfono no es una cantidad con la que se hagan cuentas — es un
identificador que se compone de dígitos. Cambiarlo de `int` a `string`
no es solo "usar un tipo más grande": es reconocer que nunca debió ser
numérico en primer lugar, y de paso permite validar que sean
exactamente dígitos sin arrastrar el riesgo de desbordamiento otra vez
si alguien decide anteponer un indicativo de país.

El resto del diseño — herencia entre `Person` y `Employee`, el cálculo
de salario aislado en su propia interfaz — ya estaba bien pensado y se
dejó igual, solo se reforzó con validación de cada dato leído por
consola: si algo no es válido, el programa dice qué falló y termina en
vez de seguir adelante con datos corruptos.

## Los cinco principios SOLID, uno por clase

| Principio | Dónde se aplica y por qué |
|---|---|
| Responsabilidad única | `Person` solo modela datos personales; `Employee` solo agrega lo que le es propio (salario y su cálculo). Ninguna clase mezcla las dos responsabilidades. |
| Abierto/cerrado | Se puede agregar otro tipo de empleado o otra forma de calcular el sueldo sin tocar el código que ya funciona, extendiendo en vez de modificando. |
| Sustitución de Liskov | Un `Employee` puede usarse en cualquier lugar que espere un `Person` sin que el comportamiento se rompa. |
| Segregación de interfaces | `IPersonInterface` expone únicamente lo relacionado con el cálculo de salario — no todos los datos de la persona — porque no todo `Person` necesariamente cobra un sueldo. |
| Inversión de dependencias | `Employee` depende del contrato `IPersonInterface`, no de una implementación concreta, para calcular el salario. |

## Estructura

```
Jornalia/
├── Jornalia.sln
└── Jornalia/
    ├── Program.cs           # lee los datos por consola y orquesta el cálculo
    ├── Person.cs            # datos personales + esperas síncrona/asíncrona
    ├── Employee.cs          # hereda de Person; agrega salario y su cálculo
    └── IPersonInterface.cs  # contrato de cálculo de salario que implementa Employee
```

## Estado

Compila sin advertencias y se probó de punta a punta con datos reales,
incluido el caso del teléfono que originalmente fallaba.
