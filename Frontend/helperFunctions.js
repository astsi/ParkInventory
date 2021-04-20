export function createEl(className, type, text, host){
    let el = document.createElement(type);
    el.className = className;
    el.innerHTML = text;
    host.appendChild(el);

    return el;
}

export function add(el, elList){
    if (!elList.includes(el))
    elList.push(el);
    else alert("This element already exists in the database. Please try again.")
}

export function remove(elName, elList){
    let ind = elList.findIndex(i => i.name ===  elName);
    if (ind > -1)
    {
        elList.splice(ind,1);
    }

    else alert("This element is not in the database. Please try again.")
}

export function isInList(elName, elList){

    let ind = elList.findIndex(i => i.name ===  elName);
    if (ind > -1)
        return true;
    else return false;
}