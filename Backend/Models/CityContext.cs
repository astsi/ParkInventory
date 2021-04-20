using System;
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
        [MaxLength(50)]
        public string name { get; set; }

        [Column("Date")]
        public string date { get; set; }

        public virtual List<Park> parkList {get; set;}


         //[DatabaseGenerated(DatabaseGeneratedOption.Computed)]

    }
}