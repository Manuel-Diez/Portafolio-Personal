namespace Jornalia
{

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string Phonenumber { get; set; }

        public Person(int id, string name, int age, string address, string phonenumber)
        {
            Id = id;
            Name = name;
            Age = age;
            Address = address;
            Phonenumber = phonenumber;
        }

        public Person()
        {
            Id = 0;
            Age = 0;
            Name = "Unknown person name";
            Address = "Unknown address";
            Phonenumber = "Unknown phone number";
        }

        public virtual void DisplayInformation()
        {
            Console.WriteLine("");
            Console.WriteLine("Informacion personal del empleado");
            Console.WriteLine("");
            Console.WriteLine($"Id : {Id}");
            Console.WriteLine($"Nombre del empleado : {Name}");
            Console.WriteLine($"Edad del empleado : {Age}");
            Console.WriteLine($"Direccion del empleado : {Address}");
            Console.WriteLine($"Teléfono del empleado : {Phonenumber}");
        }

        public void Wait(int milliseconds)
        {
            Console.WriteLine($"Esperando {milliseconds} milisegundos...");
            Thread.Sleep(milliseconds);
            Console.WriteLine("Terminó la espera.");
        }

        public async Task WaitAsync(int milliseconds)
        {
            Console.WriteLine($"Esperando {milliseconds} milisegundos (asíncrono)...");
            await Task.Delay(milliseconds);
            Console.WriteLine("Terminó la espera.");
        }

    }
}

