using System.Threading.Tasks;

namespace Jornalia
{
    public interface IPersonInterface
    {
        double CalculateSalary();
        Task<double> CalculateSalaryAsync();
    }

}
