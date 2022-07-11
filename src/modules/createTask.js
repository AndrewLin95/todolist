let tasks = [
    {title: 'test', detail: 'detail test', priority: 'priority test', date: 'date test'},
];


function pullTaskInfo(){
    const titleInfo = document.querySelector('#inputTitle');
    const inputDetails = document.querySelector('#inputDetails');
    const prioritybtns = document.querySelectorAll('.priorityBtn');
    const taskDates = document.querySelector('#dateInput');
    let newTask = new createItem(titleInfo.value, inputDetails.value, prioritybtns, taskDates.value);
    tasks.push(newTask);
    return tasks[tasks.length-1]
}

class createItem{
    constructor(title, details, priority, date){
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.date = date;
    }
}



export {pullTaskInfo};