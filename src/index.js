import { addItemDisplayOn, closeForm, formReset, clearPage, editFormReset } from './modules/display';
import { pullTaskInfo, pageInitialize, returnArray, taskFilter, generateFilteredCards, taskSort, generateAllCards, editTasks } from './modules/taskManipulation';
import { createCard } from './modules/tasksDOM';

const allTaskPageBtn = document.querySelector('#allTaskPage');
const pageSorts = document.querySelectorAll('.pageSorts');
const pageFilters = document.querySelectorAll('.pageFilters')
const addItemBtn = document.querySelector('#addItemBtn');
const closeFormBtn = document.querySelector('#cancel');
const form = document.querySelector('#formInput');
const sortBtn = document.querySelector('#sortPage');
const filterBtn = document.querySelector('#filteredPage');
const editForm = document.querySelector('#editForm');

addItemBtn.addEventListener('click', addItemDisplayOn);
closeFormBtn.addEventListener('click', closeForm);

sortBtn.addEventListener('click', () => {
    let x = document.getElementById('dateSort');
    if (x.style.display === 'block'){
        document.getElementById('sortPage').style.fontWeight = '400';
        sortBtn.textContent = 'Sort';
        document.getElementById('dateSort').style.display = 'none';
        document.getElementById('prioritySort').style.display = 'none';
    } else {
        document.getElementById('sortPage').style.fontWeight = 'bolder';
        sortBtn.textContent = '//  Sort';
        document.getElementById('dateSort').style.display = 'block';
        document.getElementById('prioritySort').style.display = 'block';
    }
})

filterBtn.addEventListener('click', () => {
    let x = document.getElementById('lowPriorityPage');
    if (x.style.display === 'block'){
        document.getElementById('filteredPage').style.fontWeight = '400';
        filterBtn.textContent = 'Filters';
        document.getElementById('lowPriorityPage').style.display = 'none';
        document.getElementById('mediumPriorityPage').style.display = 'none';
        document.getElementById('highPriorityPage').style.display = 'none';
    } else {
        document.getElementById('filteredPage').style.fontWeight = 'bolder';
        filterBtn.textContent = '//  Filters';
        document.getElementById('lowPriorityPage').style.display = 'block';
        document.getElementById('mediumPriorityPage').style.display = 'block';
        document.getElementById('highPriorityPage').style.display = 'block';
    };
});


// on submit, pulls the info from the form and pushes it to an array for all tasks.
// card gets created based on the last task inputted into the array
// submission form gets reset

// if i press the submit button, goes to main page??
form.addEventListener('submit', () => {
    pullTaskInfo();
    createCard(returnArray('last').title, returnArray('last').detail, returnArray('last').date, returnArray('last').rawDate, returnArray('last').identifier, returnArray('last').priority, returnArray('last').checkBoxStatus);
    formReset();
    document.getElementById('addItemForm').style.display = 'none';
});

allTaskPageBtn.addEventListener('click', () => {
    clearPage();
    generateAllCards();
});

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
        switch (filter) {                       
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

editForm.addEventListener('submit', () => {
    editTasks();
    clearPage();
    generateAllCards();
    document.getElementById('editPopUp').style.display = 'none';
    editFormReset();
})

// populates the page based on the localStorage value of the array
pageInitialize();