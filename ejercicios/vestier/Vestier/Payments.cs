namespace Vestier
{

    public interface IPaymentMethod
    {
        void ProcessPayment(decimal amount);
    }

    public class CreditCard : IPaymentMethod
    {
        public void ProcessPayment(decimal amount)
        {
            Console.WriteLine($"Processing credit card payment of {amount:C2}");
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
}
