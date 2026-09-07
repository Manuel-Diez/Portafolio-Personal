namespace Vestier
{

    public interface IDiscount
    {
        decimal ApplyDiscount(decimal price);
    }

    public class SeasonalDiscount : IDiscount
    {
        public decimal ApplyDiscount(decimal price)
        {
            return price * 0.9m;
        }
    }

    public abstract class Discount
    {
        public abstract decimal ApplyDiscount(decimal price);
    }

    public class HolidayDiscount : Discount
    {
        public override decimal ApplyDiscount(decimal price)
        {
            return price * 0.8m;
        }
    }
}
