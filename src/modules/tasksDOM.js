import { deleteTasks, updateCheckBoxStatus, editInfoID, editInfoCheckBox } from "./taskManipulation";
import { updateEditForm } from "./display";

const allTasksDiv = document.querySelector('#allTasks');

function createCard(title, detail, date, rawDate, identifier, priority, checkBoxStatus) {
    // create cardDiv
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardDiv';
    allTasksDiv.appendChild(cardDiv);

    // create left side of card Div
    const leftCardDiv = document.createElement('div');
    leftCardDiv.className = 'sideCardDiv left';
    cardDiv.appendChild(leftCardDiv);

    const priorityDiv = document.createElement('div');
    priorityDiv.className = 'priorityDiv';
    priorityDiv.id = `priorityDiv${identifier}`;
    leftCardDiv.appendChild(priorityDiv);
    if (priority === '1'){
        priorityDiv.style.backgroundColor = 'green';
    } else if (priority === '2'){
        priorityDiv.style.backgroundColor = 'orange';
    } else if (priority === '3'){
        priorityDiv.style.backgroundColor = 'red';
    }

    // create complete checkbox to left side of card
    const completeBox = document.createElement('input');
    completeBox.className = 'completeCheckBox';
    completeBox.id = `completeCheckBox${identifier}`
    completeBox.setAttribute('type', 'checkbox');
    leftCardDiv.appendChild(completeBox);

    // sets the toggle to the checkBoxStatus because checkBoxStatus is only ever retrieved once and doesnt get updated on change.
    let checkBoxToggle = checkBoxStatus;
    completeBox.addEventListener('click', () => {
        if (!checkBoxToggle){
            detailBtn.className = 'detailBtn checked';
            editBtn.className ='editBtn transparent checked';
            deleteBtn.className ='deleteBtn transparent checked';
            priorityDiv.style.opacity = '0.5';
            titleText.style.textDecoration = 'line-through';
            titleText.style.opacity = '0.5';
            detailText.style.textDecoration = 'line-through';
            detailText.style.opacity = '0.5';
            taskDate.style.textDecoration = 'line-through';
            taskDate.style.opacity = '0.5';
        } else if (checkBoxToggle){
            detailBtn.className = 'detailBtn';
            editBtn.className ='editBtn transparent';
            deleteBtn.className ='deleteBtn transparent';
            priorityDiv.style.opacity = '1';
            titleText.style.textDecoration = 'none';
            titleText.style.opacity = '1';
            detailText.style.textDecoration = 'none';
            detailText.style.opacity = '1';
            taskDate.style.textDecoration = 'none';
            taskDate.style.opacity = '1';
        }
        // the array gets updated by the below line with whatever the state of the checkBox is when it is pressed
        checkBoxToggle = !checkBoxToggle;
        updateCheckBoxStatus(checkBoxToggle, identifier);
    })

    // create a div for the text and details.
    const allTextDiv = document.createElement('div');
    allTextDiv.className = 'allTextDiv';
    leftCardDiv.appendChild(allTextDiv);

    // adding title information to left side of card
    const titleText = document.createElement('div');
    titleText.className = `cardText`;
    titleText.id = `cardText${identifier}`;
    titleText.textContent = title;
    allTextDiv.appendChild(titleText);

    const detailText = document.createElement('div');
    detailText.className = 'detailText';
    detailText.id = `detailText${identifier}`;
    detailText.textContent = detail;
    allTextDiv.appendChild(detailText);

    // create right side of card Div
    const rightCardDiv = document.createElement('div');
    rightCardDiv.className = 'sideCardDiv';
    cardDiv.appendChild(rightCardDiv);

    // add details to the right side of the card  div
    const detailBtn = document.createElement('button');
    detailBtn.className = 'detailBtn';
    detailBtn.id = `detailBtn${identifier}`;
    rightCardDiv.appendChild(detailBtn);
    detailBtn.textContent = 'Details';

    let clickDetect = false;

    detailBtn.addEventListener('mouseenter' , () => {
        if (!clickDetect){
            document.getElementById(`detailText${identifier}`).style.display = 'block';
            document.getElementById(`cardText${identifier}`).style.top = '0%'; 
        }
    })
    detailBtn.addEventListener('mouseleave', () => {
        if (!clickDetect){
            document.getElementById(`detailText${identifier}`).style.display = 'none';
            document.getElementById(`cardText${identifier}`).style.top = '15%'; 
        }
    })

    detailBtn.addEventListener('click', () => {
        if (!clickDetect){
            document.getElementById(`detailBtn${identifier}`).style.boxShadow = '1px 1px 10px 1px #9381FF';
            document.getElementById(`detailText${identifier}`).style.display = 'block';
            document.getElementById(`cardText${identifier}`).style.top = '0%'; 
        } else {
            document.getElementById(`detailBtn${identifier}`).style.boxShadow = '';
            document.getElementById(`detailText${identifier}`).style.display = 'none';
            document.getElementById(`cardText${identifier}`).style.top = '15%'; 
        }
        clickDetect = !clickDetect;
    })

    // add date to the right side of the card  div
    const taskDate = document.createElement('div');
    taskDate.className = 'taskDate cardText';
    rightCardDiv.appendChild(taskDate);
    taskDate.textContent = date;

    // create Edit Button
    const editBtn = document.createElement('button');
    editBtn.className ='editBtn transparent';
    editBtn.id = `editBtn${identifier}`;
    const editIcon = document.createElement('i');
    editIcon.className = "fa-solid fa-pen-to-square"
    editBtn.appendChild(editIcon);
    rightCardDiv.appendChild(editBtn);

    editBtn.addEventListener('click', () => {
        updateEditForm(title, detail, priority, rawDate);
        editInfoID(identifier);
        editInfoCheckBox(checkBoxToggle);
    })

    // create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className ='deleteBtn transparent';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = "fa-solid fa-trash-can"
    deleteBtn.appendChild(deleteIcon);
    rightCardDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        allTasksDiv.removeChild(cardDiv);
        deleteTasks(identifier);
    })

    // checks if the checkBoxStatus is true, if true, run this line to checkboxes when loaded
    if (checkBoxStatus){
        document.getElementById(`completeCheckBox${identifier}`).checked = true;
        priorityDiv.style.opacity = '0.5';
        detailBtn.className = 'detailBtn checked';
        editBtn.className ='editBtn transparent checked';
        deleteBtn.className ='deleteBtn transparent checked';
        titleText.style.textDecoration = 'line-through';
        titleText.style.opacity = '0.5';
        detailText.style.textDecoration = 'line-through';
        detailText.style.opacity = '0.5';
        taskDate.style.textDecoration = 'line-through';
        taskDate.style.opacity = '0.5';
    }
}

export {
    createCard,
}