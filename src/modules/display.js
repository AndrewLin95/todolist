

function addItemDisplayOn() {
    document.getElementById('addItemForm').style.display = 'flex';
}

function closeForm() {
    document.getElementById('addItemForm').style.display = 'none';
}

function formReset(){
    document.getElementById('formInput').reset();
}



export {
    addItemDisplayOn,
    closeForm,
    formReset,
};