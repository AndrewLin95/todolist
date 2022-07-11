import {addItemDisplayOn, closeForm, formReset} from './modules/display';
import {pullTaskInfo, returnLastTask} from './modules/createTask';
import {createCard} from './modules/allTasks';

const allTaskPageBtn = document.querySelector('#allTaskPage');
const todayPage = document.querySelector('#todayTaskPage');
const addItemBtn = document.querySelector('#addItemBtn');
const closeFormBtn = document.querySelector('#cancel');
const form = document.querySelector('#formInput');


addItemBtn.addEventListener('click', addItemDisplayOn);
closeFormBtn.addEventListener('click', closeForm);


// on submit, pulls the info from the form and pushes it to an array for all tasks.
// card gets created based on the last task inputted into the array
// submission form gets reset
form.addEventListener('submit', () => {
    pullTaskInfo();
    createCard(returnLastTask().title, returnLastTask().detail, returnLastTask().date);
    formReset();
});