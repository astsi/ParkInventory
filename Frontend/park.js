import {InventoryItem} from "./inventoryItem.js"
export class Park{

    inventoryItems = ['bin','lamp','bench','dogpark','playground']; 

    constructor(namePark, sqMeters, greenArea)
    {
        this.namePark = namePark;
        this.sqMeters = sqMeters;
        this.greenArea = greenArea;
        this.inventoryList = [];
        //this.container = null;
        //this.containerInvs = null;
    }

    isInList(name)
    {
        let result = this.inventoryItems.some(el => el.name === name);
        console.log("Value of Inventory is: " + (result)? "true" : "false");

        if (result) return true;
        else return false;
    }

    retIndex(name)
    {
        for (let i=0; i< this.inventoryList.length; i++)
        {
            if (this.inventoryList[i].name == name)
            {
                console.log("Ret Index ind: " + i);
                return i;
            }
        }
        return -1;
    }

    addItem(item)
    {
        let ind = this.retIndex(item.name);
        console.log("index: " + ind);
        if (ind < 0)
            this.inventoryList.push(item);
        
        console.log("Item posle dodavanja: " + this.inventoryList[0]);
    }

    removeItem(name)
    {
        let ind = this.retIndex(name);
        if (ind > -1)
        {
            this.inventoryList.splice(ind,1);
        }
    }

    updateItem(item)
    {
        if (item.amount > 0)
        {
            let ind = this.retIndex(item.name);
            if (ind > -1)
            {
                this.inventoryList[ind].amount = parseInt(item.amount);
            }
            else
            {
                this.addItem(item);
    
            }
        }

    }

    drawExtras(host)
    {
        let divExtras = document.createElement("div");
        divExtras.className = "divExtras";
        divExtras.innerHTML = "div Extras";
        host.appendChild(divExtras);
        // if child/dog - friendly create label that says so
    }

    drawAreaBar(host){
        let divBar = document.createElement("div");
        divBar.className = "divBar";
        divBar.innerHTML = "div Bar";
        host.appendChild(divBar);
    }

    drawParkInventory(host){
        let inventory = document.createElement("div");
        inventory.className = "divInventories";
        inventory.innerHTML = "Inventory list";
        host.appendChild(inventory);

        //console.log("Length: " + this.inventoryList.length);
        this.inventoryList.forEach(item => {
            item.drawItem(inventory);
        });
    }

    drawBlock(description, name, host)
    {
        let div = document.createElement("div");
        div.className = "divBlock";
        host.appendChild(div);

        let lab = document.createElement("lab");
        lab.className = "lab";
        lab.innerHTML = description + ": ";
        div.appendChild(lab);

        let input = document.createElement("input");
        if (!name.includes("name"))
        input.type = "number";
        input.value = name;
        input.className = name;
        div.appendChild(input);
        
    }

    drawMenu(host){
        let divMenu = document.createElement("div");
        divMenu.className = "divMenuItem";
        divMenu.innerHTML = "div Menu";
        host.appendChild(divMenu);

        let divSelect = document.createElement("div");
        divSelect.className = "divSelectItem";
        divSelect.innerHTML = "divSelect";
        divMenu.appendChild(divSelect);

        let nameLab = document.createElement("lab");
        nameLab.className = "lab";
        nameLab.innerHTML = "Select the item: ";
        divSelect.appendChild(nameLab);

        let nameIt = document.createElement("select");
        nameIt.className = "nameItem";
        divSelect.appendChild(nameIt);

        this.inventoryItems.forEach(element =>{
            let option = document.createElement("option");
            option.className = "option";
            option.innerHTML = element;
            option.value = element;
            nameIt.appendChild(option);
        });
        
        this.drawBlock("Amount", "countItema", divMenu);

        let buttonUpdate = document.createElement("button");
        buttonUpdate.className = "button";
        buttonUpdate.innerHTML = "Update Inventory";
        divMenu.appendChild(buttonUpdate);
        buttonUpdate.onclick = ev =>{
            //const name = document.querySelector(".nameItem").value;
            const amount = document.querySelector(".countItema").value;
            const name = nameIt.value;
            console.log("Item name and amount: " + name, amount);

            let item = new InventoryItem(name, amount);
            this.updateItem(item);
            
            let child = document.querySelector(".divInventories");
            let child2 = document.querySelector(".divMenuItem");
            console.log("Child 2: " + child2);
            host.removeChild(child);
            this.drawParkInventory(host);

            host.removeChild(child2);
            this.drawMenu(host);
        }

    }

    drawPark(host){

        let divPark = document.createElement("div");
        divPark.className = "divPark";
        divPark.innerHTML = "div Park";
        host.appendChild(divPark);

        //park Name
        let h = document.createElement("h2");
        h.className = "header2";
        h.innerHTML = this.namePark;
        divPark.appendChild(h);

        //extras (is dog friendly is kidsfriendly)
        this.drawExtras(divPark);

        //green area bar
        this.drawAreaBar(divPark);

        //Inventory Content
        let divContent = document.createElement("div");
        divContent.className = "divContent";
        divContent.innerHTML = "div Content - Park";
        divPark.appendChild(divContent);

        //park inventory
        this.drawParkInventory(divContent);

        //edit menu
        this.drawMenu(divContent);
    }
}