import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { createCard } from "./tasksDOM";

let tasks = [];

class CreateItem{
    constructor(title, detail, priority, date, rawDate, identifier, checkBoxStatus){
        this.title = title;
        this.detail = detail;
        this.priority = priority;
        this.date = date;
        this.rawDate = rawDate;
        this.identifier = identifier;
        this.checkBoxStatus = checkBoxStatus;
    }
}

function pullTaskInfo(){
    const titleInfo = document.querySelector('#inputTitle');
    const inputDetails = document.querySelector('#inputDetails');
    const priorityOptions = document.querySelector('#priorityOptions');
    const taskDates = document.querySelector('#dateInput');

    // takes the date in 2022-01-01 format and updates it to an iso date
    // formatted date uses date-fns to format the date to the "PPPP" format giving us the day of the week, and full date.
    let isoDateUTC = taskDates.value + "T:14:00:00";                                    
    let dateEST = formatInTimeZone(isoDateUTC, 'Canada/Eastern','yyyy-MM-dd')
    let formattedDate = format(new Date(parseISO(dateEST)), "PPPP");

    // generates a random number as the task identifier. Will be used to delete or modify the card
    let identifier = Math.floor(Math.random()*1000000)

    let checkBoxStatus = false;

    let newTask = new CreateItem(titleInfo.value, inputDetails.value, priorityOptions.value, formattedDate, taskDates.value, identifier, checkBoxStatus);
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function pageInitialize() {
    if (!localStorage.getItem('tasks')) {
        return;
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        generateAllCards();
    }
}

function returnArray(arrayType) {
    let task = arrayType;
    switch (task) {
        case 'last':
            return tasks[tasks.length-1];
    }
}

let filteredArray = [];

// filters the main array for low priority, returns the array of the filter requested
function taskFilter(filter) {
    switch (filter) {
        case 'low':
            filteredArray = tasks.filter((task) => {
                return task.priority === '1';  
            });
            break;
        case 'medium':
            filteredArray = tasks.filter((task) => {
                return task.priority === '2';
            });
            break;
        case 'high':
            filteredArray = tasks.filter((task) => {
                return task.priority === '3';
            });
    }
}

function generateFilteredCards() {
    let i = 0;
    while (i < filteredArray.length){
        createCard(filteredArray[i].title, filteredArray[i].detail, filteredArray[i].date, filteredArray[i].rawDate, filteredArray[i].identifier, filteredArray[i].priority, filteredArray[i].checkBoxStatus);
        i++;
    }
}

function taskSort(sort) {
    if (sort === 'date'){
        let sortedDates = tasks.sort(function compare(a, b){
            let dateA = new Date(a.rawDate);
            let dateB = new Date(b.rawDate);
            return dateA - dateB;
        });
        let i = 0;
        while (i < sortedDates.length){
            createCard(sortedDates[i].title, sortedDates[i].detail, sortedDates[i].date, sortedDates[i].rawDate, sortedDates[i].identifier, sortedDates[i].priority, sortedDates[i].checkBoxStatus);
            i++;
        }
    } else if (sort === 'priority'){
        let sortedPriorities = tasks.sort(function compare(a, b){return a.priority - b.priority});
        let i = 0;
        while (i < sortedPriorities.length){
            createCard(sortedPriorities[i].title, sortedPriorities[i].detail, sortedPriorities[i].date, sortedPriorities[i].rawDate, sortedPriorities[i].identifier, sortedPriorities[i].priority, sortedPriorities[i].checkBoxStatus);
            i++;
        }
    }
}

function generateAllCards() {
    let i = 0;
    while (i < tasks.length){
        createCard(tasks[i].title, tasks[i].detail, tasks[i].date, tasks[i].rawDate, tasks[i].identifier, tasks[i].priority, tasks[i].checkBoxStatus);
        i++;
    }
}

function deleteTasks(uniqueIdentifier) {
    function checkIdentifier(value) {
        return value.identifier === uniqueIdentifier;
    }
    tasks.splice(tasks.findIndex(checkIdentifier), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCheckBoxStatus(checkBoxToggle, uniqueIdentifier) {
    let newStatus = null;
    if (checkBoxToggle) {                          
        newStatus = true;
    } else {
        newStatus = false;
    }

    // the entirety of below is used to modify a single variable within the object of arrays. checkIdentifier is used to selectively choose the position of the array at the unique identifier
    function checkIdentifier(value) {
        return value.identifier === uniqueIdentifier;
    }

    // below function maps the specific object in its entirety to newTasks. the other indicies are returned as "undefined"
    let newTasks = tasks.map(obj => {                                   
        if (obj.identifier === uniqueIdentifier){
            return {...obj, checkBoxStatus: newStatus};
        }
    })

    // the returns the index of the array from the main array that we are looking for
    function returnIndex() {
        return tasks.findIndex(checkIdentifier);
    }

    // this assigns that raw value to a variable. for some reason the below splice function does not work when using that function directly
    let indexValue = returnIndex();

    // newTasks[indexValue] returns the entire object at that specific index. It cannot be written as newTasks.tasks.findIndex(checkIdentifier). Not sure why
    tasks.splice(tasks.findIndex(checkIdentifier), 1, newTasks[indexValue]);                 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}

let tempID = ''
function editInfoID(identifier){
    tempID = identifier
}

let tempCheckBoxStatus = '';
function editInfoCheckBox(checkBoxStatus){
    tempCheckBoxStatus = checkBoxStatus;
}

function editTasks(){
    const editTitle = document.querySelector('#editInput');
    const editDetail = document.querySelector('#editDetail');
    const editPriority = document.querySelector('#editPriorityOptions');
    const editTaskDates = document.querySelector('#editDateInput');

    let isoDateUTC = editTaskDates.value + "T:14:00:00";                                    
    let dateEST = formatInTimeZone(isoDateUTC, 'Canada/Eastern','yyyy-MM-dd')
    let formattedDate = format(new Date(parseISO(dateEST)), "PPPP");

    function findObject(memoryID) {
        return memoryID.identifier === tempID;
    }

    // currentTask returns the specific object in the array referncing the unique identifier
    let currentTask = tasks.find(findObject);
    // rewrites the currentTask object with changed values of the editForm
    currentTask.checkBoxStatus = tempCheckBoxStatus;
    currentTask.date = formattedDate;
    currentTask.rawDate = editTaskDates.value;
    currentTask.priority = editPriority.value;
    currentTask.title = editTitle.value;
    currentTask.detail = editDetail.value;

    function checkIdentifier(value) {
        return value.identifier === tempID;
    }
    tasks.splice(tasks.findIndex(checkIdentifier), 1, currentTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById('editPopUp').style.display = 'none';
}

export {pullTaskInfo, pageInitialize, returnArray, taskFilter, generateFilteredCards, taskSort, generateAllCards, deleteTasks, updateCheckBoxStatus, editInfoID, editInfoCheckBox, editTasks};