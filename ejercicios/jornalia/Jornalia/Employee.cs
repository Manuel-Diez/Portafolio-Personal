using System;
using System.Threading.Tasks;

namespace Jornalia
{

    public class Employee : Person, IPersonInterface
    {

        public decimal Salary { get; set; }
        public Employee() : base()
        {

            Salary = 10500000;
        }

        public Employee(int id, string name, int age, string address, string phoneNumber, decimal salary)
        : base(id, name, age, address, phoneNumber)
        {
            Salary = salary;
        }

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

            await Task.Delay(2000);
            return (double)Salary;
        }

        public decimal CalculateSalaryDay(int daysWorked)
        {

            decimal dailySalary = Salary / 30;
            return dailySalary * daysWorked;
        }

        public async Task<decimal> CalculateSalaryDayAsync(int daysWorked)
        {
            await Task.Delay(2000);
            return CalculateSalaryDay(daysWorked);
        }

    }
}
