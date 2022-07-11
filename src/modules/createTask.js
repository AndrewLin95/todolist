let tasks = [
    {title: 'test', detail: 'detail test', priority: 'priority test', date: 'date test'},
];

class createItem{
    constructor(title, details, priority, date){
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.date = date;
    }
}

function pullTaskInfo(){
    const titleInfo = document.querySelector('#inputTitle');
    const inputDetails = document.querySelector('#inputDetails');
    const priorityOptions = document.querySelector('#priorityOptions');
    const taskDates = document.querySelector('#dateInput');

    let newTask = new createItem(titleInfo.value, inputDetails.value, priorityOptions.value, taskDates.value);
    tasks.push(newTask);
    console.table(tasks);
}

function returnLastTask() {
    return tasks[tasks.length-1]
}





export {pullTaskInfo, returnLastTask};