import { deleteTasks } from "./taskManipulation";

const allTasksDiv = document.querySelector('#allTasks');

function createCard(title, detail, date, identifier, priority) {
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
    leftCardDiv.appendChild(priorityDiv);
    console.log(priority);
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
    completeBox.setAttribute('type', 'checkbox');
    leftCardDiv.appendChild(completeBox);

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
    const editIcon = document.createElement('i');
    editIcon.className = "fa-solid fa-pen-to-square"
    editBtn.appendChild(editIcon);
    rightCardDiv.appendChild(editBtn);

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
}

export {
    createCard,
}