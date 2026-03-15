using System;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Runtime.InteropServices;

// Clase principal
public class CompanyTestile
{
    public static void Main(string[] args)
    {
        // Clases, Superclase y Subclase
        Shirt shirt = new Shirt
        {
            Name = "Casual Shirt",
            Size = "M",
            Price = 29.99m,
            SleeveLength = "Long"
        };
        shirt.DisplayShirtInfo();

        // Interfaces
        SeasonalDiscount discount = new SeasonalDiscount();
        decimal discountedPrice = discount.ApplyDiscount(shirt.Price);
        Console.WriteLine($"Discounted Price: {discountedPrice}");

        // Clases de Atributos
        ClothingItem item = new ClothingItem { Name = "Jacket", Size = "L", NewPrice = 99.99m };
        item.DisplayInfo();

        // Encapsulamiento
        item.Price = 49.99m;
        Console.WriteLine($"Updated Price: {item.Price}");

        // Polimorfismo
        ClothingItem pants = new Pants();
        pants.DisplayInfo();

        // Principios SOLID
        // S - Single Responsibility Principle
        ClothingItemRepository repository = new ClothingItemRepository();
        repository.Save(item);

        // O - Open/Closed Principle
        Discount holidayDiscount = new HolidayDiscount();
        decimal holidayDiscountedPrice = holidayDiscount.ApplyDiscount(item.Price);
        Console.WriteLine($"Holiday Discounted Price: {holidayDiscountedPrice}");

        // L - Liskov Substitution Principle
        ClothingItem discountedItem = new DiscountedItem { Price = 100m };
        Console.WriteLine($"Discounted Item Price: {discountedItem.Price}");

        // I - Interface Segregation Principle
        TShirt tshirt = new TShirt();
        tshirt.DisplayInfo();
        Console.WriteLine($"T-Shirt Price: {tshirt.CalculatePrice()}");

        // D - Dependency Inversion Principle
        IPaymentMethod paymentMethod = new CreditCard();
        Checkout checkout = new Checkout(paymentMethod);
        checkout.CompletePurchase(item.Price);

        // Abstracción
        ClothingItem jacket = new Jacket { Name = "Winter Jacket", Price = 129.99m };
        jacket.DisplayInfo();

        // Herencia
        StoreManager manager = new StoreManager { Name = "Alice", Position = "Manager" };
        manager.ManageStore();

        // Métodos y Funciones
        Inventory inventory = new Inventory();
        int stock = inventory.AddStock(10, 5);
        inventory.DisplayStock(stock);

        // Async y Await
        DisplayStockAsync().Wait();
    }

    // Async y Await
    public static async Task DisplayStockAsync()
    {
        Inventory inventory = new Inventory();
        int stock = await inventory.CheckStockAsync();
        Console.WriteLine("Async Stock: " + stock);
    }
}

// Clases, Superclase y Subclase
public class ClothingItem
{
    public string Name { get; set; }
    public string Size { get; set; }
    public decimal Price { get; set; }

    public virtual void DisplayInfo()
    {
        Console.WriteLine($"Name: {Name}, Size: {Size}, Price: {Price}");
    }
}

public class Shirt : ClothingItem
{
    public string SleeveLength { get; set; }

    public void DisplayShirtInfo()
    {
        Console.WriteLine($"Name: {Name}, Size: {Size}, Price: {Price}, Sleeve Length: {SleeveLength}");
    }
}

// Interfaces
public interface IDiscount
{
    decimal ApplyDiscount(decimal price);
}

public class SeasonalDiscount : IDiscount
{
    public decimal ApplyDiscount(decimal price)
    {
        return price * 0.9m; // 10% discount
    }
}

// Clases de Atributos
[Serializable]
public class ClothingItem
{
    [DefaultValue("Unknown")]
    [Category("General Info")]
    public string Name { get; set; }

    [Browsable(false)]
    public string Size { get; set; }

    [Obsolete("Use NewPrice instead", true)]
    public decimal OldPrice { get; set; }

    [ComVisible(true)]
    public decimal NewPrice { get; set; }
}

// Encapsulamiento
public class ClothingItem
{
    private decimal _price;

    public decimal Price
    {
        get { return _price; }
        set
        {
            if (value >= 0)
                _price = value;
        }
    }
}

// Polimorfismo
public class Pants : ClothingItem
{
    public override void DisplayInfo()
    {
        Console.WriteLine("Displaying pants info...");
    }
}

// Principios SOLID
// S - Single Responsibility Principle
public class ClothingItemRepository
{
    public void Save(ClothingItem item)
    {
        // Save item to the database
    }
}

// O - Open/Closed Principle
public abstract class Discount
{
    public abstract decimal ApplyDiscount(decimal price);
}

public class HolidayDiscount : Discount
{
    public override decimal ApplyDiscount(decimal price)
    {
        return price * 0.8m; // 20% discount
    }
}

// L - Liskov Substitution Principle
public class DiscountedItem : ClothingItem
{
    public override decimal Price
    {
        get { return base.Price * 0.9m; } // 10% discount
    }
}

// I - Interface Segregation Principle
public interface IClothingItem
{
    void DisplayInfo();
}

public interface IPriceCalculable
{
    decimal CalculatePrice();
}

public class TShirt : IClothingItem, IPriceCalculable
{
    public void DisplayInfo()
    {
        Console.WriteLine("Displaying T-Shirt info...");
    }

    public decimal CalculatePrice()
    {
        return 19.99m;
    }
}

// D - Dependency Inversion Principle
public interface IPaymentMethod
{
    void ProcessPayment(decimal amount);
}

public class CreditCard : IPaymentMethod
{
    public void ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing credit card payment of {amount}");
    }
}

public class Checkout
{
    private readonly IPaymentMethod _paymentMethod;

    public Checkout(IPaymentMethod paymentMethod)
    {
        _paymentMethod = paymentMethod;
    }

    public void CompletePurchase(decimal amount)
    {
        _paymentMethod.ProcessPayment(amount);
    }
}

// Abstracción
public abstract class ClothingItem
{
    public string Name { get; set; }
    public decimal Price { get; set; }

    public abstract void DisplayInfo();
}

public class Jacket : ClothingItem
{
    public override void DisplayInfo()
    {
        Console.WriteLine($"Jacket: {Name}, Price: {Price}");
    }
}

// Herencia
public class Employee
{
    public string Name { get; set; }
    public string Position { get; set; }
}

public class StoreManager : Employee
{
    public void ManageStore()
    {
        Console.WriteLine("Managing the store...");
    }
}

// Métodos y Funciones
public class Inventory
{
    public int AddStock(int currentStock, int newStock)
    {
        return currentStock + newStock;
    }

    public void DisplayStock(int stock)
    {
        Console.WriteLine($"Current stock: {stock}");
    }

    public async Task<int> CheckStockAsync()
    {
        await Task.Delay(2000); // Simula una operación asincrónica
        return 50;
    }
}
