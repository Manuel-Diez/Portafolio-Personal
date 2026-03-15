using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Entity.Model.Security
{
    public class RoleView
    {
        /*[Key]*/
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt{ get; set; }
        public string Description { get; set; }
        public bool State { get; set; }

        // Foreign keys
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        public int ViewId { get; set; }
        [ForeignKey("ViewId")]
        public virtual View View { get; set; }
    }
}
