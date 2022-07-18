function addItemDisplayOn() {
    document.getElementById('addItemForm').style.display = 'flex';
}

function closeForm() {
    document.getElementById('addItemForm').style.display = 'none';
}

function formReset(){
    document.getElementById('formInput').reset();
}

function clearPage(){
    let allTasks = document.getElementById('allTasks');
    let eachCard = document.querySelectorAll('.cardDiv')
    
    eachCard.forEach((card) => {
        allTasks.removeChild(card);
    });
}

function updateEditForm(identifier, title, detail, priority, rawDate, checkBoxStatus){
    document.getElementById('editInput').setAttribute('value', title);
    document.getElementById('editDetail').textContent = detail;
    document.getElementById('editPriorityOptions').value = priority;
    document.getElementById('editDateInput').value = rawDate;
    document.getElementById('editPopUp').style.display = 'flex';
}

export {
    addItemDisplayOn,
    closeForm,
    formReset,
    clearPage,
    updateEditForm
};