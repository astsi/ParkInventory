import { Park } from "./park.js";

export class City{

    constructor(id, nameCity, year)
    {
        this.id = id;
        this.nameCity = nameCity;
        this.year = year;

        this.parkList = [];

        //this.container = null;
    }

    isInList(parkName)
    {
        let result = this.parkList.some(el => el.name === parkName);
        console.log("Value of park is: " + (result)? "true" : "false");

        if (result) return true;
        else return false;
    }

    retIndex(parkName)
    {
        for (let i=0; i< this.parkList.length; i++)
        {
            if (this.parkList[i].namePark == parkName)
            {
                console.log("Ret Index ind: " + i);
                return i;
            }
        }
        return -1;
    }

    addPark(park)
    {
        //let check = this.isInList(park);
        //if (!check)
        let ind = this.retIndex(park.namePark);
        console.log("index: " + ind);
        if (ind < 0)
            this.parkList.push(park);
    }

    removePark(parkName)
    {
        let ind = this.retIndex(parkName);
        if (ind > -1)
        {
            this.parkList.splice(ind,1);
        }
    }

    //Drawing 
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

    drawLabel(name, host)
    {
        let label = document.createElement("label");
        label.className = "\blabAddRemove";
        label.innerHTML = name;
        host.appendChild(label);
    }

    drawMenu(host){
        let divMenu = document.createElement("div");
        divMenu.className = "divMenu";
        divMenu.innerHTML ="div menu";
        host.appendChild(divMenu);

        this.drawLabel("Add Park: ", divMenu);
        this.drawBlock("Name","name", divMenu);
        this.drawBlock("Size (in arces)","size", divMenu);
        this.drawBlock("Green area", "area", divMenu);


        let buttonAdd = document.createElement("button");
        buttonAdd.className = "btnSubmit";
        buttonAdd.innerHTML = "Submit Park";
        divMenu.appendChild(buttonAdd);
        buttonAdd.onclick = ev => {
            const name = document.querySelector(".name").value;
            const area =  document.querySelector(".size").value;
            const greenArea = document.querySelector(".area").value;

            console.log(name, area, greenArea);
            let p = new Park(name,area,greenArea);
            this.addPark(p);
            console.log(this.parkList[0]);
            console.log(this.parkList[1]);
            console.log(this.parkList[2]);
            
            let child = document.querySelector(".divParks");
            host.removeChild(child)
            this.drawParks(host);

        }

        this.drawLabel("Remove Park: ", divMenu);
        this.drawBlock("Name","nameR", divMenu);



        let buttonRemove = document.createElement("button");
        buttonRemove.classname = "btnRemove";
        buttonRemove.innerHTML = "Remove Park";
        divMenu.appendChild(buttonRemove);
        buttonRemove.onclick = ev => {
            const name = document.querySelector(".nameR").value;
            
            this.removePark(name);
            
            let child = document.querySelector(".divParks");
            host.removeChild(child);
            this.drawParks(host);

        }

    }

    drawParks(host)
    {
        let divParks = document.createElement("div");
        divParks.className = "divParks";
        divParks.innerHTML = "div Parks ";
        host.appendChild(divParks);

        this.parkList.forEach(park => {
            park.drawPark(divParks);
        });
    }
    draw(host)
    {
        //main div
        let divCity = document.createElement("div");
        divCity.className = "divCity";
        host.appendChild(divCity);

        //heading 
        let h = document.createElement("h1");
        h.className = "heading";
        h.innerHTML = "Grad " + this.nameCity + " " + this.year; 
        divCity.appendChild(h);

        //content of the div
        let divContent = document.createElement("div");
        divContent.className = "divContent";
        divContent.innerHTML = " div Content"
        divCity.appendChild(divContent);

        //search = show only dog friendly parks

        //search = show only kids friendly parks


        //menu
        this.drawMenu(divContent);

        //parks
        this.drawParks(divContent);


    }
}