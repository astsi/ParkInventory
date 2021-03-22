using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("InventoryItem")]
    public class InventoryItem{
        
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        public string name { get; set; }

        [Column("Amount")]
        public int amount { get; set; }

        [Column("Image")]
        public string image {get; set; }
        
        [JsonIgnore]
        [Column("Park")]
        public Park park {get; set; }

    }
}