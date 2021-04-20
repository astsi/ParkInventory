using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using static System.Net.Mime.MediaTypeNames;

namespace Backend.Models
{
    [Table("InventoryItem")]
    public class InventoryItem{
        
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        public string name { get; set; }

        [Column("Num")]
        public int num { get; set; }

        [Column("Description")] //izmena
        public string description {get; set; }
        
        [JsonIgnore]
        [Column("Park")]
        public Park park {get; set; }

    }
}