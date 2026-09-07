using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Dto
{
    public class PersonDataDto
    {
        public int Id { get; set; }
        public string First_name { get; set; }
        public string Last_name { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string Type_document { get; set; }
        public string Document { get; set; }
        public DateTime Birth_of_date { get; set; }
        public int PhoneNumber { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
