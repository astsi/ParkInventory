import { createEl } from "./helperFunctions.js";

export class InventoryItem{

    constructor(id, name, num, desc){
        this.id = id;
        this.name = name;
        this.num = num;
        this.description = desc;
        
        this.container = null;
    }

    refreshItem(){
        let content = this.container.querySelector(".pItem");
        this.container.removeChild(content);
        this.drawContent(this.container);
    }

    drawContent(host){
        createEl("pItem","p", this.name + " x " + this.num, this.container);
    }

    drawItem(host){
        this.container = createEl("divItem","div","",host);
        this.drawContent(this.container);
        
        // let btnUpdate = createEl("btnUpdateItem","button", "Update Item", host);
        // let btnDelete = createEl("btnDeleteItem","button","Delete Item", host);
        // btnDelete.onclick = ev => {
        //     let content = this.container.querySelector(".pItem");
        //     this.container.removeChild(content);
        //     this.drawContent()
        //}
    }
}