import {City} from "./city.js"
import {Park} from "./park.js"
import {InventoryItem} from "./inventoryItem.js"


/*let c1 = new City(1,"Nis", "Cair");
let p1 = new Park(1, "Cair", 1000, 500);
let i1 = new InventoryItem(1,"lamp",5);

p1.addItem(i1);
c1.addPark(p1);
c1.addPark(p1);
c1.draw(document.body); */
//p1.drawPark(document.body);

fetch("https://localhost:5001/ParkInventory/GetCities").then(p => {
    p.json().then(data => {
        data.forEach(city => {
            const cityObject = new City(1,city.name, city.year);
            cityObject.draw(document.body);
            
            city.parkList.forEach(park =>{
                const parkObject = new Park(1, park.name, park.sqMeters, park.greenArea);
                parkObject.drawPark(cityObject.containerParks);

            })
        });
    })
});