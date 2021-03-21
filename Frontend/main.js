import {City} from "./city.js"
import {Park} from "./park.js"
import {InventoryItem} from "./inventoryItem.js"


let c1 = new City(1,"Nis", "Cair");
let p1 = new Park(1, "Cair", 1000, 500);
let i1 = new InventoryItem(1,"lamp",5);

p1.addItem(i1);
c1.addPark(p1);
c1.addPark(p1);
c1.draw(document.body);
//p1.drawPark(document.body);