import { City } from "./city.js";
import { createEl, isInList } from "./helperFunctions.js";
import { InventoryItem } from "./inventoryItem.js"
import { Park } from "./park.js"


export class Container{

    constructor(){
        this.container = null;
        this.cityList = [];
    }

    drawAll(host){

        let divHeader = createEl("header","div","",host);
        createEl("header","h1","Parks in Serbia",divHeader);
        //dodati datum preko neke funkcije
        createEl("paragraph","p",".",divHeader); 

        let nav = createEl("navbar","div","",host);
        createEl("desc","p","",nav);

        let row = createEl("row","div","",host);
        let side = createEl("side","div","",row);

        createEl("h2","h2","Edit cities ",side);

        let btnEdit = createEl("btnEdit","button","Edit Cities",side);
        btnEdit.onclick = ev => {
            let div = document.querySelector(".menuCity");
            if (div.style.display === "none")
                div.style.display = "flex";
            else
                div.style.display = "none";
        }

        this.drawMenu(side);

        createEl("h5","h5", "About the site: ", side);
        createEl("p","p","This site demonstrates inventory of parks that are located in different cities in Serbia.",side);

        let main = createEl("main", "div","", row);
        this.container = main;

        fetch("https://localhost:5001/ParkInventory/GetCities").then(p => {
            p.json().then(data => {
                data.forEach(city => {
                    const cityObject = new City(city.id, city.name, city.date);
                    this.cityList.push(cityObject);
                    cityObject.drawCity(this.container);
                    
                    city.parkList.forEach(park =>{
                        const parkObject = new Park(park.id, park.name, park.location, park.greenArea);
                        cityObject.addPark(parkObject);
                        //parkObject.drawPark(cityObject.containerParks);
                        park.inventoryList.forEach(item =>{
        
                            const itemObjext = new InventoryItem(item.id, item.name, item.num, item.description);
                            parkObject.addItem(itemObjext);
                            itemObjext.drawItem(parkObject.containerInventory);
                        });
        
                    });
                });
            });
        }); 

    }

    returnDate(){
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        return datetime;
    }

    drawMenu(host){
        let menu = createEl("menuCity","div","",host);
        menu.style.display = "none";
        createEl("lab","label","Enter the name of the city:", menu);
        let nameIn = createEl("inp","input","",menu);
        let btnSub = createEl("btnSubmit","button","Add City",menu);
        btnSub.onclick = ev => {
            let name = nameIn.value;
            if (name != "" && !isInList(name,this.cityList))
            {
                let dat = this.returnDate();

                fetch("https://localhost:5001/ParkInventory/AddCity", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                    {
                        name: name,
                        date: dat
                    })
                }).then(p => 
                    {
                        if(p.ok){
                            p.text().then(q => {
                                let city = new City(q, name, dat);
                                this.cityList.push(city);
                                city.drawCity(this.container);
                            });
                        }
                        else if(p.status == 406){
                            alert("Input all informations.");
                        }
                        else {
                            alert("Error");
                        }
                }).catch (p => {
                    alert("Error");
                });    
            }

            else{
                alert("Invalid name for the city. Please try again.")
            }
        }
    }
}

