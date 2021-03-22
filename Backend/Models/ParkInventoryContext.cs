using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{

    public class ParkInventoryContext : DbContext
    {
        public DbSet<City> Cities {get;set;}
        public DbSet<Park> Parks {get; set;}

        public DbSet<InventoryItem> InventoryItems {get; set;}

        public ParkInventoryContext(DbContextOptions options) : base(options)
        {
             
        }
    }
}