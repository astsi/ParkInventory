export class InventoryItem{

    constructor(id, name, amount, img)
    {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.img = img;

        if (amount < 0 || amount === "undefined" || amount === null)
            amount = 1;
        //this.container = null;
    }

    drawImage(host)
    {
       
    }

    drawLabel(host)
    {
        let label = document.createElement("label");
        label.className = "labelItem";
        label.innerHTML = this.name + " x " + this.amount;
        host.appendChild(label);
    }

    drawItem(host){

        //Item container
        let divInv = document.createElement("div");
        divInv.className = "divItem";
        //divInv.innerHTML = "div Item";

        console.log(host);
        host.appendChild(divInv);

        //itemImage
        this.drawImage(divInv);

        //item description
        this.drawLabel(divInv);

    }
}