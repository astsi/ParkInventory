using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("City")]
    public class City
    {
        [Key]
        [Column("ID")]
        public int id { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string name { get; set; }

        [Column("Year")]
        public int year { get; set; }

        public virtual List<Park> parkList {get; set;}

    }
}