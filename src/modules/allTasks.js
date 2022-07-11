
const allTasksDiv = document.querySelector('#allTasks');

function createCard(title, detail, date) {
    // create cardDiv
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardDiv';
    allTasksDiv.appendChild(cardDiv);

    // create complete checkbox
    const completeBox = document.createElement('input');
    completeBox.setAttribute('type', 'checkbox');
    cardDiv.appendChild(completeBox);

    // adding title information to card
    const titleText = document.createElement('span');
    titleText.textContent = title;
    cardDiv.appendChild(titleText);

}

export {
    createCard,
}