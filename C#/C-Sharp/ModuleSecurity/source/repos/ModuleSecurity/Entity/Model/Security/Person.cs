using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.Security
{
    public class Person
    {
        /*[Key]*/
        public int Id { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string Type_document { get; set; }
        public string Document { get; set; }
        public DateTime Birth_of_date { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
        public int Phonenumber { get; set; }
        public bool State { get; set; }

        // Navigation property
        /*public virtual ICollection<User> Users { get; set; }
        public string Description { get; set; }*/
    }
}
