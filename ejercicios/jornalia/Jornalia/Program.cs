using System;
using System.Threading.Tasks;

namespace Jornalia
{
    class Program
    {
        static async Task Main(string[] args)
        {

            Console.WriteLine("Porfavor digite los datos del empleado");
            await Task.Delay(2000);
            Console.WriteLine("");

            Console.WriteLine("Nombre: ");
            string? name = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(name))
            {
                Console.WriteLine("El nombre no puede estar vacío.");
                return;
            }

            Console.WriteLine("Edad: ");
            string? Age = Console.ReadLine();
            if (!int.TryParse(Age, out int age) || age <= 0)
            {
                Console.WriteLine("La edad ingresada no es válida.");
                return;
            }

            Console.WriteLine("Direccion: ");
            string? address = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(address))
            {
                Console.WriteLine("La dirección no puede estar vacía.");
                return;
            }

            Console.WriteLine("Número telefónico: ");
            string? phoneNumber = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(phoneNumber) || !phoneNumber.All(char.IsDigit))
            {
                Console.WriteLine("El número telefónico ingresado no es válido.");
                return;
            }
            Console.WriteLine("");

            Console.WriteLine("¿cuánto es el pago mensual del empleado? ");
            if (!decimal.TryParse(Console.ReadLine(), out decimal MonthlySalary) || MonthlySalary <= 0)
            {
                Console.WriteLine("El valor ingresado no es un número válido.");
                return;
            }
            Console.WriteLine("");

            Employee employee = new Employee(1, name, age, address, phoneNumber, MonthlySalary);

            Console.WriteLine("¿El empleado, cuatos dias trabajo en el mes?: ");
            string? days_Worked = Console.ReadLine();
            if (!int.TryParse(days_Worked, out int daysWorked) || daysWorked < 0 || daysWorked >30)
            {
                Console.WriteLine("Como que los dias del trabajador no coinciden, verdad?");
                return;
            }

            employee.DisplayInformation();
            Console.WriteLine("");
            await Task.Delay(5000);

            decimal salary = employee.CalculateSalaryDay(daysWorked);
            Console.WriteLine($"Salary (sincrónico, basado en {daysWorked} días trabajados): {salary:C2}");

            decimal asyncSalary = await employee.CalculateSalaryDayAsync(daysWorked);
            Console.WriteLine($"Salary (asíncrono, basado en {daysWorked} días trabajados): {asyncSalary:C2}");

            await employee.WaitAsync(2000);
        }
    }
}