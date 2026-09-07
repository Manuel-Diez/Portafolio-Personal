# Vestier

Recorrido de consola en .NET 8 / C# por los conceptos centrales de
programación orientada a objetos — herencia, interfaces, polimorfismo,
encapsulamiento, abstracción, atributos de .NET, `async`/`await` — y
los cinco principios SOLID, todos aplicados sobre el mismo dominio
pequeño: una tienda de ropa (camisas, pantalones, chaquetas,
descuentos, inventario, caja). Antes se llamaba "Trabajo C#"; el
nombre nuevo es como le dicen en Colombia al vestidor o clóset, el
lugar donde vive la ropa — justo el dominio que usan todos los
ejemplos.

```bash
dotnet run --project Vestier
```

## El dominio, en detalle

Todo gira alrededor de `ClothingItem`: una prenda con nombre, talla y
precio (encapsulado, con validación de que no sea negativo). De ahí
heredan `Shirt`, `Pants` y `Jacket`. Sobre esa base se montan los diez
conceptos: `IDiscount` aplica descuentos sin que `ClothingItem` sepa
nada de cómo se calculan (abierto/cerrado), `DiscountedItem` extiende
el comportamiento sin romper el contrato de la clase base (Liskov),
`TShirt` implementa solo la porción de una interfaz que de verdad
necesita (segregación de interfaces), `Payments` depende de una
abstracción de método de pago en vez de una implementación concreta
(inversión de dependencias), `ClothingItemRepository` concentra
únicamente la persistencia (responsabilidad única), `StoreStaff` monta
una jerarquía de empleados (`Employee` → `StoreManager`), e
`Inventory` expone las mismas operaciones de forma síncrona y
asíncrona.

## El problema que tenía

El archivo original, `CompanyTestile.cs`, definía la clase
`ClothingItem` **cuatro veces** dentro del mismo namespace. Esto pasó
porque cada concepto de POO se había escrito como un fragmento aislado
— uno para mostrar herencia básica, otro para atributos de .NET, otro
para encapsulamiento, otro para abstracción — y cada fragmento traía su
propia versión de `ClothingItem` con los miembros que ese ejemplo en
particular necesitaba, sin que nadie los integrara nunca en un programa
único. El resultado es el error de compilación `CS0101` ("el namespace
ya contiene una definición para ClothingItem"): el proyecto, tal como
estaba, **nunca llegó a ejecutarse ni una sola vez**, porque ni
siquiera compilaba.

## Por qué se resolvió así

Borrar tres de las cuatro definiciones habría sido lo más rápido, pero
también habría perdido los miembros que cada versión aportaba para su
propio ejemplo (unas tenían los atributos de .NET, otras el precio
encapsulado, otras el método virtual). En vez de eso, reuní en una
sola clase `ClothingItem` todo lo que las cuatro versiones necesitaban
entre sí, para que ningún concepto de los que se querían mostrar se
perdiera en el camino.

Además, separé el resto del código en un archivo por concepto en vez
de dejarlo todo en un único archivo de más de 300 líneas mezclando diez
ideas distintas. La razón es la misma que se está tratando de enseñar:
si el ejercicio es sobre responsabilidad única, el propio código del
ejercicio debería practicarla — cada archivo demuestra una cosa y se
puede leer sin tener que entender las otras nueve primero.

| Archivo | Qué demuestra |
|---|---|
| `ClothingItem.cs` | herencia, atributos, encapsulamiento, polimorfismo, abstracción |
| `Discounts.cs` | interfaces (`IDiscount`) y el principio abierto/cerrado |
| `DiscountedItem.cs` | sustitución de Liskov |
| `TShirt.cs` | segregación de interfaces |
| `Payments.cs` | inversión de dependencias |
| `ClothingItemRepository.cs` | responsabilidad única |
| `StoreStaff.cs` | herencia (`Employee` → `StoreManager`) |
| `Inventory.cs` | métodos síncronos y asíncronos |
| `Program.cs` | punto de entrada, recorre los diez conceptos en orden |

De paso, `ClothingItemRepository.Save()` pasó de ser un método vacío
con un comentario ("Save item to the database") a guardar de verdad en
una lista en memoria, con su `GetAll()` para consultarla — si el
archivo existe para demostrar responsabilidad única, tenía que hacer
algo real y verificable, no simular que lo hacía.

## Estado

Compila sin advertencias y corre los diez conceptos en una sola pasada
del programa, sin errores.
