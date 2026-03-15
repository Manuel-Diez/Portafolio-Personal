using System;
using System.Threading.Tasks;

namespace ConsoleExamen1
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // Se piden los datos personales del cliente \\
            Console.WriteLine("Porfavor digite los datos del empleado");
            await Task.Delay(2000);
            Console.WriteLine("");

            Console.WriteLine("Nombre: ");
            string name = Console.ReadLine();

            Console.WriteLine("Edad: ");
            string Age = Console.ReadLine();
            if (!int.TryParse(Age, out int age) || age <= 0)
            {
                Console.WriteLine("La edad ingresada no es válida.");
                return;
            }

            Console.WriteLine("Direccion: ");
            string address = Console.ReadLine();
            Console.WriteLine("Número telefónico: ");
            string PhoneNumber = Console.ReadLine();
            if (!int.TryParse(PhoneNumber, out int phoneNumber) || phoneNumber <= 0)
            {
                Console.WriteLine("El número telefónico ingresado no es válido.");
                return;
            }
            Console.WriteLine("");


            // Crear una instancia de Employee \\

            /*Console.WriteLine("En unos segundos se mostrara la informacion personal del empleado");
            await Task.Delay(5000);
            Console.WriteLine("");
            Console.WriteLine("");*/


            /*Employee employee = new Employee(2, "Ana Gómez", 28, "Avenida Siempre Viva 456", 1200000);
            employee.DisplayInformation();
            await employee.WaitAsync(1000); // Espera asíncrona
            Console.WriteLine("");*/


            // Pregunat al usuario cuanto es el salario mesual \\
            Console.WriteLine("¿cuánto es el pago mensual del empleado? ");
            if (!decimal.TryParse(Console.ReadLine(), out decimal MonthlySalary) || MonthlySalary <= 0)
            {
                Console.WriteLine("El valor ingresado no es un número válido.");
                return;
            }
            Console.WriteLine("");
            
            Employee employee = new Employee(1, name, age, address, phoneNumber, MonthlySalary);

            // Pergunta al usuario cuantos dias trabajo \\
            Console.WriteLine("¿El empleado, cuatos dias trabajo en el mes?: ");
            string days_Worked = Console.ReadLine();
            if (!int.TryParse(days_Worked, out int daysWorked) || daysWorked < 0 || daysWorked >30)
            {
                Console.WriteLine("Como que los dias del trabajador no coinciden, verdad?");
                return;
            }

            // Muestra toda la informacion del empleado \\
            employee.DisplayInformation();
            Console.WriteLine("");
            await Task.Delay(5000);

            decimal salary = employee.CalculateSalaryDay(daysWorked);
            Console.WriteLine($"Salary (sincrónico, basado en {daysWorked} días trabajados): {salary:C2}");

            // Calcular el salario asíncronamente
            decimal asyncSalary = await employee.CalculateSalaryDayAsync(daysWorked);
            Console.WriteLine($"Salary (asíncrono, basado en {daysWorked} días trabajados): {asyncSalary:C2}");





            // Actualiza el monto del salario del empleado \\
           
            
            /*employee.Salary = MonthlySalary;*/

            // Preguntar al usuario cuántos días trabajó \\
            /*Console.Write("¿Cuántos días trabajó este mes? ");
            if (int.TryParse(Console.ReadLine(), out int daysWorked) && daysWorked >= 0 && daysWorked <= 30)
            {
                decimal salary = employee.CalculateSalaryDay(daysWorked);
                Console.WriteLine($"Salary (sincrónico, basado en {daysWorked} días trabajados): {salary:C2}");

                // Calcular el salario asíncronamente
                decimal asyncSalary = await employee.CalculateSalaryDayAsync(daysWorked);
                Console.WriteLine($"Salary (asíncrono, basado en {daysWorked} días trabajados): {asyncSalary:C2}");
            }
            else
            {
                Console.WriteLine("Número de días no válido.");
            }*/

            await employee.WaitAsync(2000);


            
        }
    }
}