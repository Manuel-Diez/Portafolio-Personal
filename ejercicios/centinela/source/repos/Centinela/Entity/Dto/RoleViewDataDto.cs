using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Dto
{
    public class RoleViewDataDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int RoleId { get; set; }
        public int ViewId { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
