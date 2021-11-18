var taskIdCounter = 0;

var formE1 = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var taskInProgressE1 =document.querySelector("#tasks-in-progress");
var tasksCompleteE1 = document.querySelector("#tasks-completed");
var pageContentE1 = document.querySelector("#page-content");

var taskFormHandler = function (event) { 
     event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (taskNameInput === "" || !taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    }
    
    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // check if task is new or one being edited by seeing if it has a data-task-id attribute   
    var isEdit = formE1.hasAttribute("data-task-id");

        if (isEdit) {
            var taskId = formE1.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        } else {
          var taskDataObj = {
            name: taskNameInput, 
            type: taskTypeInput
        };

        createTaskE1(taskDataObj);
    }
};    
    
var createTaskE1 = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //create task actions (buttons and select) for task
     var taskActionsE1 = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionsE1);
     tasksToDoEl.appendChild(listItemEl); 
   
        //increase task counter for next unique id
        taskIdCounter++;
    };
    
    var createTaskActions = function(taskId) {
        // create container to hold elements
        var actionContainerE1 = document.createElement("div");
        actionContainerE1.className = "task-actions";
    
    // create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "butn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);
    actionContainerE1.appendChild(editButtonE1);
    // create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);
    actionContainerE1.appendChild(deleteButtonE1);
    // create change status dropdown
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    statusSelectE1.className = "select-status";
    actionContainerE1.appendChild(statusSelectE1);
    // create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];
    
    for (var i = 0; i < statusChoices; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttributeNS("value", statusChoices[i]);
        statusOptionE1.textContent = statusChoices[i];
          
        //append to select
        statusSelectE1.appendChild(statusOptionE1);
    }
    
    return actionContainerE1;
};

var complteteEditTask = function(taskName, taskType, taskId) {
    //find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.taskname").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskName;
    
    alert("Task Updated!");

    //remove data attribute from form
    formE1.removeAttribute("data-task-id");
    //update form E1 button to go back to saying "add task" instead of "edit task"
    formE1.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {
    //get target element from event
    var targetE1 = event.target;
    
    if (targetE1.matches(".edit-btn")) {
        console.log("edit", targetE1);
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetE1.matches(".delete-btn")) {
        console.log("delete", targetE1);
        var taskId = targetE1.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
    
var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);

    //find task list item based on even.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");

    var taskSelected = document.querySelector(".task-item[data-task-item'" + taskId + "']");

    //convert value to lower case
    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(tasksSelected);
    } else if (statusValue === "in progress") {
      tasksInProgressE1.appendChild(taskSelected);
    } else if (statusValue === "completed") {
      tasksCompletedE1.appendChild(taskSelected);
    }
};

var editTask = function(taskId) {
    console.log(taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    //write values of taskname and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    //set data attribute to the form with a value of the task's id so it knows which one is being edited
    formE1.setAttribute("data-task-id", taskId);
    //update form's button to reflect editing a task rather than creating a new one.
    formE1.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
    console.log(taskId);
    //find task list element with taskID value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

//create a new task
formE1.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentE1.addEventListener("click", taskButtonHandler);

//for changing the status
pageContentE1.addEventListener("change", taskButtonHandler);