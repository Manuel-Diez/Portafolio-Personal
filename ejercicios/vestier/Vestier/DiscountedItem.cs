namespace Vestier
{

    public class DiscountedItem : ClothingItem
    {
        public override decimal Price
        {
            get => base.Price * 0.9m;
            set => base.Price = value;
        }
    }
}
