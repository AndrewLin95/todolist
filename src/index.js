import { addItemDisplayOn, closeForm, formReset, clearPage } from './modules/display';
import { pullTaskInfo, pageInitialize, returnArray, taskFilter, generateFilteredCards, generateAllCards } from './modules/createTask';
import { createCard } from './modules/allTasks';

const allTaskPageBtn = document.querySelector('#allTaskPage');
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

pageFilters.forEach((page) => {
    page.addEventListener('click', () => {
        let filter = page.id;
        switch (filter) {                       // if i just remove the add button, it wont need to automatically refresh.... add only available on main page :D
            case 'lowPriorityPage':
                clearPage();
                taskFilter('low');
                generateFilteredCards();
                break;
            case 'mediumPriorityPage':
                clearPage();
                taskFilter('medium');
                generateFilteredCards();
                break;
            case 'highPriorityPage':
                clearPage();
                taskFilter('high');
                generateFilteredCards();
                break;
            default:
                console.log('default');
                break;
        }
    })
});

// populates the page based on the localStorage value of the array
pageInitialize();