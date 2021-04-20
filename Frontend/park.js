import { add, createEl, isInList, remove } from "./helperFunctions.js";
import {InventoryItem} from "./inventoryItem.js"
export class Park{

    inventoryItems = ['bin','lamp','bench','dogpark','playground','fountain']; 

    constructor(id, name, location, greenArea){

        this.id = id;
        this.name = name;
        this.location = location;
        this.greenArea = greenArea;
        this.inventoryList = [];

        this.container = null;
        this.containerInventory = null;
    }

    isDogFriendly(){
        let result = this.inventoryList.some(el => el.name === "dogpark");
        return result;
    }

    isKidsFriendly(){
        let result = this.inventoryList.some(el => el.name === "playground");
        return result;
    }

    addItem(item){
        let ind = this.inventoryList.findIndex(i => i.name === item.name);
        if (ind === -1){

            add(item,this.inventoryList);
        }
        else{
            this.inventoryList[ind].num += item.num;
        }

        console.log(this.inventoryList);
    }

    drawGreenArea(host){

        if(this.greenArea < 0 || this.greenArea > 100){
            alert("The green area percentage must be a value between 0 and 100.");
        }
        else{
            let wrap = createEl("wrap","div","",host);
            let gArea = createEl("greenArea","div","",wrap);
            createEl("labGreen","label","Green Area: " + this.greenArea + "%", gArea);
            gArea.style.width = this.greenArea + "%";

        }
    }

    addItemInDB(name,num,desc){

        console.log(this.id);

    fetch("https://localhost:5001/ParkInventory/AddInventory/" + this.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "num": num,
                "description": desc
            })
        }).then(p => {
                if (p.ok){
                
                    console.log("post");
                    p.text().then(q => {
                        let item = new InventoryItem(q,name,num,desc);
                        add(item,this.inventoryList);
                        item.drawItem(this.containerInventory);
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
        // let item = new InventoryItem(q,name,num,desc);
        // add(item,this.inventoryList);
        // item.drawItem(this.containerInventory);
    }

    MenuItem(host){
        let menu = createEl("menu", "div","",host);
        menu.style.display = "none";
        createEl("hEdit","h4","Edit Inventory:",menu);
        createEl("labInvName", "label","Item Name: ", menu);
        let inputName = createEl("inName", "input","",menu);
        createEl("labInvNum", "label","Number of items: ", menu);
        let inputNum = createEl("inNum", "input","",menu);
        inputNum.type = "number";

        let buttons = createEl("buttonsItem","div","",menu);

        let btnAdd = createEl("btnAddItem","button","Add Item",buttons);
        btnAdd.onclick = ev => {
            let name = inputName.value;
            let num = inputNum.value;

            if (!isInList(name,this.inventoryList))
            {
                if (name != "" && num > 0){

                    let desc = "Universal description";
                    this.addItemInDB(name,num,desc);
                }

                else
                    alert("The entered data is not valid.");
            
            }
            else
            {
                alert("This item is already in the list. Try to update.")
            }
        }
        
        let btnUpdate = createEl("btnUpdate","button", "Update Item", buttons);
        btnUpdate.onclick = ev => {
            console.log(this.inventoryList);
            console.log("Input name: " + inputName.value);
            console.log("input num: "+ inputNum.value);
            if (isInList(inputName.value, this.inventoryList) && inputNum.value > 0){
                
                let ind = this.inventoryList.findIndex(i => i.name ===  inputName.value);
                console.log(ind);
                this.inventoryList[ind].num = inputNum.value;
                console.log(this.inventoryList[ind]);

                fetch("https://localhost:5001/ParkInventory/UpdateInventory", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        "id": this.inventoryList[ind].id,
                        "name": this.inventoryList[ind].name,
                        "num": this.inventoryList[ind].num,
                        "description": this.inventoryList[ind].description
                    })
                }).then(p => {
                    if (p.ok){

                        this.inventoryList[ind].refreshItem();
                    }
                    else{
                        alert("Error - another type of error.");
                    }
                });
            }
            else{
                alert("This item cannot be updated.");
            }
        }

        let btnDelete = createEl("btnDelete","button","Delete Item", buttons);
        btnDelete.onclick = ev =>{
            let name = inputName.value;
            let ind = this.inventoryList.findIndex(i => i.name === name);
            if (ind === -1)

                alert ("Error: Data for the park isn't valid. ")
            else
            {
                fetch("https://localhost:5001/ParkInventory/DeleteInventoryItem/" + this.inventoryList[ind].id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                    })
                }).then(p => {
                        if (p.ok){

                            this.containerInventory.removeChild(this.inventoryList[ind].container);
                            remove(name, this.inventoryList);
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

    drawPark(host){

        this.container = createEl("divPark","div","",host);
        createEl("pParkInfo","h3", this.name, this.container);
        createEl("pParkInfo","h5","Location: " + this.location, this.container);
        
        this.drawGreenArea(this.container);
        let hInventory = createEl("parksInventory", "h4","Park's inventory:", this.container);
        this.containerInventory = createEl("divInventory", "div","", this.container);
        let br = document.createElement("br");
        this.containerInventory.appendChild(br);
        this.inventoryList.forEach(item => {
            item.drawItem(this.containerInventory);
        });

        let btnEdit = createEl("btnEdit","button","Edit Inventory",this.container);
        btnEdit.onclick = ev => {
            let div = this.container.querySelector(".menu");

            if (div.style.display === "none")
            {
                div.style.display = "flex";
            }
            else 
            {
                div.style.display = "none";
            }
        }
        this.MenuItem(this.container);

    }

}