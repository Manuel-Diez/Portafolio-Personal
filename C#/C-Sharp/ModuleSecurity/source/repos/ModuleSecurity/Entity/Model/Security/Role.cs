using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.Security
{
    public class Role
    {
        /*[Key]*/
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
        public string Description { get; set; }
        public bool State { get; set; }

        /*// Navigation property
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<RoleView> RoleViews { get; set; }*/
    }
}
