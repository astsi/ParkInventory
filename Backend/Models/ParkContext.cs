using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Park")]
    public class Park
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        public string name { get; set; }

        [Column("Location")]
        public string location { get; set; }


        [Column("GreenArea")]
        public int greenArea { get; set; }
        
        [JsonIgnore]
        [Column("City")]
        public City city {get; set; }
        
        public virtual List<InventoryItem> inventoryList { get; set; }

    }
}