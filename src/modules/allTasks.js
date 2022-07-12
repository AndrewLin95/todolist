
const allTasksDiv = document.querySelector('#allTasks');

function createCard(title, detail, date) {
    // create cardDiv
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardDiv';
    allTasksDiv.appendChild(cardDiv);

    // create left side of card Div
    const leftCardDiv = document.createElement('div');
    leftCardDiv.className = 'sideCardDiv';
    cardDiv.appendChild(leftCardDiv);

    // create complete checkbox to left side of card
    const completeBox = document.createElement('input');
    completeBox.className = 'completeCheckBox';
    completeBox.setAttribute('type', 'checkbox');
    leftCardDiv.appendChild(completeBox);

    // adding title information to left side of card
    const titleText = document.createElement('div');
    titleText.className = 'cardText';
    titleText.textContent = title;
    leftCardDiv.appendChild(titleText);

    // create right side of card Div
    const rightCardDiv = document.createElement('div');
    rightCardDiv.className = 'sideCardDiv';
    cardDiv.appendChild(rightCardDiv);

    // add details to the right side of the card  div
    const detailBtn = document.createElement('button');
    detailBtn.className = 'detailBtn';
    rightCardDiv.appendChild(detailBtn);
    detailBtn.textContent = 'Details';
        // create call to function to show details in a pop up once clicked

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
    })
}

export {
    createCard,
}