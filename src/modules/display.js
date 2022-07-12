

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
    console.log('test');
    let allTasks = document.getElementById('allTasks');
    let eachCard = document.querySelectorAll('.cardDiv')
    
    eachCard.forEach((card) => {
        allTasks.removeChild(card);
    });
}

export {
    addItemDisplayOn,
    closeForm,
    formReset,
    clearPage
};