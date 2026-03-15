
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Entity.Model.Security
{
    public class Module
    {
        /*[Key]*/
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
        public bool State { get; set; }

        // Foreign key
        /*public int ViewId { get; set; }
        [ForeignKey("ViewId")]
        public virtual View View { get; set; }*/
    }
}
