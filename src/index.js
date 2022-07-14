import { addItemDisplayOn, closeForm, formReset, clearPage } from './modules/display';
import { pullTaskInfo, pageInitialize, returnArray, taskFilter, generateFilteredCards, taskSort, generateAllCards } from './modules/taskManipulation';
import { createCard } from './modules/tasksDOM';

const allTaskPageBtn = document.querySelector('#allTaskPage');
const pageSorts = document.querySelectorAll('.pageSorts');
const pageFilters = document.querySelectorAll('.pageFilters')
const addItemBtn = document.querySelector('#addItemBtn');
const closeFormBtn = document.querySelector('#cancel');
const form = document.querySelector('#formInput');

addItemBtn.addEventListener('click', addItemDisplayOn);
closeFormBtn.addEventListener('click', closeForm);


// on submit, pulls the info from the form and pushes it to an array for all tasks.
// card gets created based on the last task inputted into the array
// submission form gets reset

// if i press the submit button, goes to main page??
form.addEventListener('submit', () => {
    pullTaskInfo();
    createCard(returnArray('last').title, returnArray('last').detail, returnArray('last').date, returnArray('last').identifier);
    formReset();
});

allTaskPageBtn.addEventListener('click', () => {
    clearPage();
    generateAllCards();
})

// can implement a reverse sort too. Need CSS / styling changes first

pageSorts.forEach((page) => {
    page.addEventListener('click', () => {
        let sort = page.id;
        clearPage();
        switch (sort) {
            case 'dateSort':
                taskSort('date');
                break;
            case 'prioritySort':
                taskSort('priority');
                break;
        }
    })
});

pageFilters.forEach((page) => {
    page.addEventListener('click', () => {
        let filter = page.id;
        clearPage();
        switch (filter) {                       // if i just remove the add button, it wont need to automatically refresh.... add only available on main page :D
            case 'lowPriorityPage':
                taskFilter('low');
                break;
            case 'mediumPriorityPage':
                taskFilter('medium');
                break;
            case 'highPriorityPage':
                taskFilter('high');
                break;
            default:
                break;
        }
        generateFilteredCards();
    })
});

// populates the page based on the localStorage value of the array
pageInitialize();