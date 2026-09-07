using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.Security
{
    public class City
    {
        public int Id { get; set; }
        public string Citys { get; set; }
        public string State_Department { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
        public bool State { get; set; }
    }
}
