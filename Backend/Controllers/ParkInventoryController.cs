using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParkInventoryController : ControllerBase
    {
        public ParkInventoryContext Context {get; set;}
        public ParkInventoryController(ParkInventoryContext context)
        {
            Context = context;
        }

#region City

        [Route("GetCities")]
        [HttpGet]
        public async Task<List<City>> GetCities()
        {
            return await Context.Cities.Include(p => p.parkList).ThenInclude(p => p.inventoryList).ToListAsync();
        }
        
        [Route("AddCity")]
        [HttpPost]
        public async Task AddCity([FromBody] City city)
        {
            Context.Cities.Add(city);
            await Context.SaveChangesAsync();
        }

        [Route("UpdateCity")]
        [HttpPut]
        public async Task UpdateCity([FromBody] City city)
        {
            Context.Update<City>(city);
            await Context.SaveChangesAsync();
        }

        [Route("DeleteCity/{id}")]
        [HttpDelete]

        public async Task DeleteCity(int id)
        {
            var city = await Context.Cities.FindAsync(id);
            Context.Remove(city);
            await Context.SaveChangesAsync();
        }

#endregion

#region Park

        [Route("GetParks")]
        [HttpGet]
        public async Task<List<Park>> GetParks()
        {
            return await Context.Parks.Include(p => p.inventoryList).ToListAsync();
        }

        [Route("AddPark/{idCity}")]
        [HttpPost]
        public async Task InsertPark([FromBody] Park park, int idCity)
        {
            var city = await Context.Cities.FindAsync(idCity);
            park.city = city;
            Context.Parks.Add(park);
            await Context.SaveChangesAsync();
        }

        [Route("DeletePark/{id}")]
        [HttpDelete]

        public async Task DeletePark(int id)
        {
            var park = await Context.Parks.FindAsync(id);
            Context.Remove(park);
            await Context.SaveChangesAsync();
        }

#endregion

#region Inventory Item

        [Route("AddInventory/{idPark}")]
        [HttpPost]
        public async Task InsertInventory([FromBody] InventoryItem item, int idPark)
        {
            var park = await Context.Parks.FindAsync(idPark);
            item.park = park;
            Context.InventoryItems.Add(item);
            await Context.SaveChangesAsync();
        }

        [Route("UpdateInventory")]
        [HttpPut]
        public async Task<IActionResult> UpdateInventory([FromBody] InventoryItem item)
        {
             if (item.name == "" || item.amount < 1 || item.image == "")
            {
                return StatusCode(406);
            }
            
            else 
            {
            Context.Update<InventoryItem>(item);
            await Context.SaveChangesAsync();
            return Ok();
            }

        }

        [Route("DeleteInventoryItem/{id}")]
        [HttpDelete]
        public async Task DeleteItem(int id)
        {
            var item = await Context.InventoryItems.FindAsync(id);
            Context.Remove(item);
            await Context.SaveChangesAsync();
        }

#endregion       
    }
}
