import {addItemDisplayOn} from './modules/display';

const allTaskPageBtn = document.querySelector('#allTaskPage');
const todayPage = document.querySelector('#todayTaskPage');
const addItemBtn = document.querySelector('#addItemBtn');


addItemBtn.addEventListener('click', addItemDisplayOn);