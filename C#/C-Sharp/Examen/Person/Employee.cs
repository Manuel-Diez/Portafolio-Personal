using System;
using System.Threading.Tasks;

namespace Person.Employee
{
    // Clase de empleado con herencia de persona y un nuevo atributo "Salario" \\
    public class Employee : Person, IPersonInterface
    {
        
        // Atributo adicional del salario \\
        public decimal Salary {  get; set; }
        public Employee() : base() {

            Salary = 10500000;
        }

        // Herencia de la clase Persona \\
        public Employee(int id, string name, int age, string address, decimal salary)
        : base(id, name, age, address)
        {
            Salary = salary;
        }

        // Mostrar la informacion del empleado \\
        public override void DisplayInformation()
        {
            base.DisplayInformation();
            Console.WriteLine($"Salary: {Salary:C2}");
        }

        public double CalculateSalary()
        {
            return (double)Salary;
        }

        public async Task<double> CalculateSalaryAsync()
        {
            // Metodo Asyn para devolver el salario con 2 segundos de retraso \\
            await Task.Delay(2000);
            return (double)Salary;
        }

        // L.S.P Liskov Substitution Principle \\
        // La clase Employee puede sustituir a Person llamandola e implementar nuevos metos y lo mas importante sin romper su funcionalidad inicial \\

        // D.I.P Dependecy Inversion Principle \\
        // La classe Employee depende de Interface para asi mismo ser util al momento de varias implementaciones puedan ser utilizadas \\
    }
}
