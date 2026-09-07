using System.Threading.Tasks;

namespace Vestier
{

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
            await Task.Delay(2000);
            return 50;
        }
    }
}
