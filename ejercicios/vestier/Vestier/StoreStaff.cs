namespace Vestier
{

    public class Employee
    {
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }

    public class StoreManager : Employee
    {
        public void ManageStore()
        {
            Console.WriteLine("Managing the store...");
        }
    }
}
