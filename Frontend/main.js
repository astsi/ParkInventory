import {City} from "./city.js"
import {Park} from "./park.js"
import {InventoryItem} from "./inventoryItem.js"

/*
let c1 = new City("Nis", "Cair");
let p1 = new Park("Cair", 1010, 500);
let i1 = new InventoryItem("dogpark",5);

p1.addItem(i1);
c1.addPark(p1);
c1.addPark(p1);
c1.draw(document.body); 

*/

//p1.drawPark(document.body);

fetch("https://localhost:5001/ParkInventory/GetCities").then(p => {
    p.json().then(data => {
        data.forEach(city => {
            const cityObject = new City(city.id, city.name, city.year);
            cityObject.draw(document.body);
           // console.log(city);
            
            city.parkList.forEach(park =>{
                const parkObject = new Park(park.id, park.name, park.sqMeters, park.greenArea);
                parkObject.drawPark(cityObject.containerParks);
                console.log(park);

                park.inventoryList.forEach(item =>{
                    
                    console.log(item.image);
                    const itemObjext = new InventoryItem(item.id, item.name, item.amount, item.image);
                    console.log(itemObjext);
                    itemObjext.drawItem(parkObject.containerInventory);
                });

            });
        });
    })
});