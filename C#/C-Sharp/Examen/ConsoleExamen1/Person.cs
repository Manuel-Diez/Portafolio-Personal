namespace ConsoleExamen1
{
    // Clase y sus atributos \\
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public int Phonenumber { get; set; }


        // constructor \\
        public Person(int id, string name, int age, string address, int phonenumber)
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
        }

        // Mostrar informacion \\
        public virtual void DisplayInformation()
        {
            Console.WriteLine("");
            Console.WriteLine("Informacion personal del empleado");
            Console.WriteLine("");
            Console.WriteLine($"Id : {Id}");
            Console.WriteLine($"Nombre del empleado : {Name}");
            Console.WriteLine($"Edad del empleado : {Age}");
            Console.WriteLine($"Direccion del empleado : {Address}");
        }

        // Método sincrónico Wait espera unos segundos \\
        public void Wait(int milliseconds)
        {
            /*Console.WriteLine($"Esperando {milliseconds} milisegundos...");*/
            Thread.Sleep(milliseconds); // Simula una espera sincrónica \\
            Console.WriteLine("Terminó la espera.");
        }

        // Método asíncrono WaitAsync no bloquea las tareas que estan en proceso \\
        public async Task WaitAsync(int milliseconds)
        {
            Console.WriteLine($"Esperando {milliseconds} milisegundos (asíncrono)...");
            await Task.Delay(milliseconds); // Simula una espera asíncrona \\
            Console.WriteLine("Terminó la espera.");
        }

        // S.R.P. Single Responsibility Principle \\
        // La classe Person maneja solo la informacion personla de Employee y sus aspectos espesificos \\

        // O.C.P Open/Close Principle \\
        // Se puede extender las clases y la interfaz sin modificar el codigo existente\\
    }
}

