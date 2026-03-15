namespace Person
{
    // Clase y sus atributos \\
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }


        // constructor \\
        public Person(int id, string name, int age, string address)
        {
            Id = id;
            Name = name;
            Age = age;
            Address = address;
        }

        public Person() { 
        
            Id = 0;
            Age = 0;
            Name = "Unknown person name";
            Address = "Unknown address";
        }

        // Mostrar informacion \\
        public virtual void DisplayInformation()
        {
            Console.WriteLine("Se muestra la informacion de la persona con los metodos espesificos del examen hasta ahora");
            Console.WriteLine($"Id : {Id}");
            Console.WriteLine($"Name : {Name}");
            Console.WriteLine($"Age : {Age}");
            Console.WriteLine($"Addres : {Address}");
        }

        // Método sincrónico Wait espera unos segundos \\
        public void Wait(int milliseconds)
        {
            Console.WriteLine($"Esperando {milliseconds} milisegundos...");
            Thread.Sleep(milliseconds); // Simula una espera sincrónica \\
            Console.WriteLine("Terminó la espera.");
        }

        // Método asíncrono WaitAsync no bloquea las tareas que estan en proceso \\
        public async Task WaitAsync(int milliseconds)
        {
            Console.WriteLine($"Esperando {milliseconds} milisegundos (asíncrono)...");
            await Task.Delay(milliseconds); // Simula una espera asíncrona \\
            Console.WriteLine("Terminó la espera (asíncrono).");
        }

        // S.R.P. Single Responsibility Principle \\
        // La classe Person maneja solo la informacion personla de Employee y sus aspectos espesificos \\

        // O.C.P Open/Close Principle \\
        // Se puede extender las clases y la interfaz sin modificar el codigo existente\\
    }
}
