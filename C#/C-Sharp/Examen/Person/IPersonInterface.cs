using System.Threading.Tasks;

namespace Person
{
    public interface IPersonInterface
    {
        double CalculateSalary();
        Task<double> CalculateSalaryAsync();
    }

    // S.R.P. Single Responsibility Principle \\
    // La interface de Person define los metodos relacionados con el salario del Employee \\

    // I.S.P Interface Segration Principle \\
    // la Interface esta relacionada solo en cumplir el metodo de CalculateSalary \\

}
