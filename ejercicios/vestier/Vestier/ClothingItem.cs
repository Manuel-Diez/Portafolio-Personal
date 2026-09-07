using System;
using System.ComponentModel;
using System.Runtime.InteropServices;

namespace Vestier
{

    [Serializable]
    public class ClothingItem
    {
        [DefaultValue("Unknown")]
        [Category("General Info")]
        public string Name { get; set; } = "Unknown";

        [Browsable(false)]
        public string Size { get; set; } = string.Empty;

        private decimal _price;
        public virtual decimal Price
        {
            get => _price;
            set
            {
                if (value >= 0)
                    _price = value;
            }
        }

        [Obsolete("Use NewPrice instead", true)]
        public decimal OldPrice { get; set; }

        [ComVisible(true)]
        public decimal NewPrice { get; set; }

        public virtual void DisplayInfo()
        {
            Console.WriteLine($"Name: {Name}, Size: {Size}, Price: {Price:C2}");
        }
    }

    public class Shirt : ClothingItem
    {
        public string SleeveLength { get; set; } = string.Empty;

        public void DisplayShirtInfo()
        {
            Console.WriteLine($"Name: {Name}, Size: {Size}, Price: {Price:C2}, Sleeve Length: {SleeveLength}");
        }
    }

    public class Pants : ClothingItem
    {
        public override void DisplayInfo()
        {
            Console.WriteLine("Displaying pants info...");
        }
    }

    public class Jacket : ClothingItem
    {
        public override void DisplayInfo()
        {
            Console.WriteLine($"Jacket: {Name}, Price: {Price:C2}");
        }
    }
}
