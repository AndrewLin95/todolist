import {addItemDisplayOn, closeForm, formReset} from './modules/display';
import {pullTaskInfo} from './modules/createTask';
import { createCard } from './modules/allTasks';

const allTaskPageBtn = document.querySelector('#allTaskPage');
const todayPage = document.querySelector('#todayTaskPage');
const addItemBtn = document.querySelector('#addItemBtn');
const closeFormBtn = document.querySelector('#cancel');
const form = document.querySelector('#formInput');


addItemBtn.addEventListener('click', addItemDisplayOn);
closeFormBtn.addEventListener('click', closeForm);



form.addEventListener('submit', () => {
    createCard(pullTaskInfo().title, pullTaskInfo().detail, pullTaskInfo().date);
    formReset();
});