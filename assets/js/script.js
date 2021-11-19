var taskIdCounter = 0;
var formE1 = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var pageContentE1 = document.querySelector("#page-content");
//var tasks [];

var taskFormHandler = function (event) { 
     event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (taskNameInput ==="" || !taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    }
    
    formE1.reset();

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    //package up data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    }
    //send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
}

var createTaskE1 = function(taskDataObj) {
   // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    
    //addtask id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

     var taskActionsEl = createTaskActions(taskIdCounter);
     console.log(taskActionsEl);
   

    var createTaskActions = function(taskId) {
        var actionContainerEl = document.createElement("div");
            actionContainerEl.className = "task-actions";
    tasksToDoEl.appendChild(listItemEl); 

    //increase task counter for the next unique id
    taskIdCounter++;
}

    //create edit button
    var editButtonE1 = dcoument.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "butn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(editButtonE1);

    //create delete button
    var deleteButtonE1 = dcoument.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectE1 = dcoument.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];
        for (var i = 0; i < statusChoices; i++) {
            //create option element
            var statusOptionEl = document.createElement("option");
            statusOptionE1.textContent = statusChoices[i];
            statusOptionEl.setAttributeNS("value", statusChoices[i]);
            
            //append to select
            statusSelectE1.appendChild(statusOptionE1);
        }
    
    return actionContainerE1;
};
formE1.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    console.log(event.target);
    
    if (event.target.matches(".delete-btn")) {
        //get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        console.log("taskId!");
    }
};
pageContentE1.addEventListener("click", taskButtonHandler);