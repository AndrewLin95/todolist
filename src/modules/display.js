function addItemDisplayOn() {
    document.getElementById('addItemForm').style.display = 'flex';
}

function closeForm() {
    document.getElementById('addItemForm').style.display = 'none';
}

function formReset(){
    document.getElementById('formInput').reset();
}

function editFormReset(){
    document.getElementById('editForm').reset();
}

function clearPage(){
    let allTasks = document.getElementById('allTasks');
    let eachCard = document.querySelectorAll('.cardDiv')
    
    eachCard.forEach((card) => {
        allTasks.removeChild(card);
    });
}

function updateEditForm(title, detail, priority, rawDate){
    document.getElementById('editInput').setAttribute('value', title);
    document.getElementById('editDetail').textContent = detail;
    document.getElementById('editPriorityOptions').value = priority;
    document.getElementById('editDateInput').value = rawDate;
    document.getElementById('editPopUp').style.display = 'flex';
}

function updateSortBtn() {
    const sortBtn = document.querySelector('#sortPage');

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
}

function updateFilterBtn() {
    const filterBtn = document.querySelector('#filteredPage');
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
}

export {
    addItemDisplayOn,
    closeForm,
    formReset,
    clearPage,
    updateEditForm,
    editFormReset,
    updateSortBtn,
    updateFilterBtn
};