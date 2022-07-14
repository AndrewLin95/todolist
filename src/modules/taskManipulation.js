import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { createCard } from "./tasksDOM";

let tasks = [];

class createItem{
    constructor(title, detail, priority, date, rawDate, identifier){
        this.title = title;
        this.detail = detail;
        this.priority = priority;
        this.date = date;
        this.rawDate = rawDate;
        this.identifier = identifier;
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

    // formatted the priorty to allow for easier sorting
    let priorityFormatted = '';
    if (priorityOptions.value === 'Low'){
        priorityFormatted = '1Low';
    } else if (priorityOptions.value === 'Medium'){
        priorityFormatted = '2Medium';
    } else if (priorityOptions.value === 'High'){
        priorityFormatted = '3High'
    }
    console.log(priorityFormatted);

    let newTask = new createItem(titleInfo.value, inputDetails.value, priorityFormatted, formattedDate, taskDates.value, identifier);
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
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
                return task.priority === '1Low';         // these are caps because when the priority is saved in the array, it takes the input from the dropdownlist (presented in caps)
            });
            break;
        case 'medium':
            filteredArray = tasks.filter((task) => {
                return task.priority === '2Medium';
            });
            break;
        case 'high':
            filteredArray = tasks.filter((task) => {
                return task.priority === '3High';
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

function taskSort(sort) {
    if (sort === 'date'){
        let sortedDates = tasks.sort(function compare(a, b){
            let dateA = new Date(a.rawDate);
            let dateB = new Date(b.rawDate);
            return dateA - dateB;
        });
        let i = 0;
        while (i < sortedDates.length){
            createCard(sortedDates[i].title, sortedDates[i].detail, sortedDates[i].date);
            i++;
        }
    } else if (sort === 'priority'){
        let sortedPriorities = tasks.sort(function compare(a, b){
            if (a.priority > b.priority){
                return 1;
            }
            if (a.priority < b.priority){
                return -1;
            }
            return 0;
        });
        console.log(sortedPriorities);
        let i = 0;
        while (i < sortedPriorities.length){
            createCard(sortedPriorities[i].title, sortedPriorities[i].detail, sortedPriorities[i].date);
            i++;
        }
    }
}

function generateAllCards() {
    let i = 0;
    while (i < tasks.length){
        createCard(tasks[i].title, tasks[i].detail, tasks[i].date);
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

export {pullTaskInfo, pageInitialize, returnArray, taskFilter, generateFilteredCards, taskSort, generateAllCards, deleteTasks};