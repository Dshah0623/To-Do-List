
// Select the Elements
const dateElement = document.getElementById("date");
const clear = document.querySelector (".clear");
const list = document.getElementById("list");
const input =  document.getElementById ("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = [], id;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last one in list 
    loadList(LIST); //load the list to UI
}else{ // data isnt empty
    LIST = [];
    id = 0;
}

//load items to UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
}); 

// Show todays date
const options = {weekday : "long", month:"short", day: "numeric"};
const today = new Date ();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function 


function addToDo(todo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = `<li class = "item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                   </li> 
                 `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, time);
}

//add an item 
document.addEventListener("keyup", function(even){
    if(event.keycode == 13){
        const toDo = input.value;

        //if
        if(toDo){
            addToDo(toDo, id, false, false );

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item to localstorage
            localstorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value=""; 
    }
});

//complete to do 

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector (".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true; 
}

//remove toDo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

//target dramatically created items
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list 
    const elementJob = element.attributes.job.value; //completes or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage
    localstorage.setItem("TODO", JSON.stringify(LIST));

})