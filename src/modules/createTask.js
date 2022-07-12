import { format } from 'date-fns';
import { createCard } from "./allTasks";

let tasks = [];

class createItem{
    constructor(title, detail, priority, date){
        this.title = title;
        this.detail = detail;
        this.priority = priority;
        this.date = date;
    }
}

function pullTaskInfo(){
    const titleInfo = document.querySelector('#inputTitle');
    const inputDetails = document.querySelector('#inputDetails');
    const priorityOptions = document.querySelector('#priorityOptions');
    const taskDates = document.querySelector('#dateInput');

    let date = format(new Date(taskDates.value), 'PPP');

    let newTask = new createItem(titleInfo.value, inputDetails.value, priorityOptions.value, date);
    tasks.push(newTask);
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
                return task.priority === 'Low';         // these are caps because when the priority is saved in the array, it takes the input from the dropdownlist (presented in caps)
            });
            break;
        case 'medium':
            filteredArray = tasks.filter((task) => {
                return task.priority === 'Medium';
            });
            break;
        case 'high':
            filteredArray = tasks.filter((task) => {
                return task.priority === 'High';
            });
    }
}

function generateFilteredCards() {
    let i = 0;
    while (i < filteredArray.length){
        createCard(filteredArray[i].title, filteredArray[i].detail, filteredArray[i].date);
        i++;
    }
}

function generateAllCards() {
    let i = 0;
    while (i < tasks.length){
        createCard(tasks[i].title, tasks[i].detail, tasks[i].date);
        i++;
    }
}

export {pullTaskInfo, returnArray, taskFilter, generateFilteredCards, generateAllCards};