namespace Vestier
{

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
}
