import { add, createEl, isInList, remove } from "./helperFunctions.js";
import { InventoryItem } from "./inventoryItem.js";
import { Park } from "./park.js";

export class City {
    constructor(id, name, date){

        this.id = id;
        this.name = name;
        this.date = date;
        this.parkList = [];

        this.container = null;
        this.containerParks = null;
    }

    removeCity(host){
        host.removeChild(this.container);
    }

    addPark(park){

        if (!isInList(park.name,this.parkList)){
            add(park,this.parkList);
            park.drawPark(this.containerParks);
        }
        else
            alert("This park already exists!");
    }

    drawMenu(host){

        let menu = createEl("divMenu", "div","",host);
        menu.style.display = "none";
        createEl("hEdit","h4","Edit Parks:", menu);        
        createEl("labParkName", "label","Name of the Park: ", menu);
        let inputName = createEl("inName", "input","",menu);
        createEl("labParkLocation", "label","Location of the Park: ", menu);
        let inputLocation = createEl("inLocation", "input","",menu);
        createEl("labParkGreenArea", "label","Percentage of green area: ", menu);
        let inputGreenArea = createEl("inGreenArea", "input","",menu);

        createEl("labDogFriendly", "label", "Dog park ", menu);
        let inputDogFriendly = createEl("inDogFriendly","input","", menu);
        inputDogFriendly.type = "checkbox";

        createEl("labKidsFriendly", "label", "Entertainment for the children ", menu);
        let inputKidsFriendly = createEl("inKidsFriendly","input","", menu);
        inputKidsFriendly.type = "checkbox";

        let buttons = createEl("buttons","div","",menu);

        let btnAdd = createEl("btnAdd","button","Add Park",buttons);
        btnAdd.onclick = ev =>{

            let name = inputName.value;
            let location = inputLocation.value;
            let area = inputGreenArea.value;

            if (name != "" && location !="" && 25 < area && area <= 100)
            {              
                fetch("https://localhost:5001/ParkInventory/AddPark/" + this.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": name,
                        "location": location,
                        "greenArea": area
                    })
                }).then(p => {
                        if (p.ok){
                            p.text().then(q => {
                                let park = new Park(q,name,location,area);
                                
                                if (inputDogFriendly.checked){
                                   // park.addItem(new InventoryItem(1,"dogpark",1));
                                    park.addItemInDB("dogPark",1,"This is a dogpark.");
                                }
                                
                                if (inputKidsFriendly.checked){
                                    //park.addItem(new InventoryItem(1,"playground",1));
                                    park.addItemInDB("Playground",1,"This is a playground.");

                                }
                                this.addPark(park);
                            });
                        }
                        else if(p.status == 406){
                            alert("Input all informations.");
                        }
                        else {
                            alert("Error - another type of error.");
                        }
                }).catch (p => {
                    alert("Error");
                }); 
            }

            else
            alert("Invalid input. Please try again. ");
        }

        let btnDelete = createEl("btnDel","button","Delete Park", buttons);
        btnDelete.onclick = ev =>{
            
            let name = inputName.value;
            let location = inputLocation.value;
            let ind = this.parkList.findIndex(i => i.name === name && i.location === location);
            if (ind === -1)
                alert ("Error: Data for the park isn't valid. ")
            else
            {
                fetch("https://localhost:5001/ParkInventory/DeletePark/" + this.parkList[ind].id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    })
                }).then(p => {
                        if (p.ok){
                            this.containerParks.removeChild(this.parkList[ind].container);
                            remove(name, this.parkList);
                        }

                        else {
                            alert("Error - another type of error.");
                        }
                }).catch (p => {
                    alert("Error");
                }); 
            }
        }
    }

    drawCity(host){
        
        this.container = createEl("divCity","div","",host);
        createEl("hCity","h2",this.name, this.container);
        createEl("hDate", "h5","Creation date: " + this.date,this.container);

        let btnEdit = createEl("btnEdit","button","Edit Parks",this.container);
        btnEdit.onclick = ev =>{
            let div = this.container.querySelector(".divMenu");

            if (div.style.display === "none")
            {
                div.style.display = "flex";
            }
            else
            {
                div.style.display = "none";
            }

        }

        this.drawMenu(this.container);

        this.containerParks = createEl("divParks","div","", this.container);
        this.parkList.forEach(park => {
            park.drawPark(this.containerParks);
        });



    }

}