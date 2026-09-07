using System.Threading.Tasks;

namespace Vestier
{
    public class Program
    {
        public static async Task Main(string[] args)
        {

            Shirt shirt = new Shirt
            {
                Name = "Casual Shirt",
                Size = "M",
                Price = 29.99m,
                SleeveLength = "Long"
            };
            shirt.DisplayShirtInfo();

            SeasonalDiscount discount = new SeasonalDiscount();
            decimal discountedPrice = discount.ApplyDiscount(shirt.Price);
            Console.WriteLine($"Discounted Price: {discountedPrice:C2}");

            ClothingItem item = new ClothingItem { Name = "Jacket", Size = "L", NewPrice = 99.99m };
            item.DisplayInfo();

            item.Price = 49.99m;
            Console.WriteLine($"Updated Price: {item.Price:C2}");

            ClothingItem pants = new Pants();
            pants.DisplayInfo();

            ClothingItemRepository repository = new ClothingItemRepository();
            repository.Save(item);
            Console.WriteLine($"Items guardados en el repositorio: {repository.GetAll().Count}");

            Discount holidayDiscount = new HolidayDiscount();
            decimal holidayDiscountedPrice = holidayDiscount.ApplyDiscount(item.Price);
            Console.WriteLine($"Holiday Discounted Price: {holidayDiscountedPrice:C2}");

            ClothingItem discountedItem = new DiscountedItem { Price = 100m };
            Console.WriteLine($"Discounted Item Price: {discountedItem.Price:C2}");

            TShirt tshirt = new TShirt();
            tshirt.DisplayInfo();
            Console.WriteLine($"T-Shirt Price: {tshirt.CalculatePrice():C2}");

            IPaymentMethod paymentMethod = new CreditCard();
            Checkout checkout = new Checkout(paymentMethod);
            checkout.CompletePurchase(item.Price);

            ClothingItem jacket = new Jacket { Name = "Winter Jacket", Price = 129.99m };
            jacket.DisplayInfo();

            StoreManager manager = new StoreManager { Name = "Alice", Position = "Manager" };
            manager.ManageStore();

            Inventory inventory = new Inventory();
            int stock = inventory.AddStock(10, 5);
            inventory.DisplayStock(stock);

            await DisplayStockAsync();
        }

        private static async Task DisplayStockAsync()
        {
            Inventory inventory = new Inventory();
            int stock = await inventory.CheckStockAsync();
            Console.WriteLine("Async Stock: " + stock);
        }
    }
}
