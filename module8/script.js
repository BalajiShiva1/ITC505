document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    
    taskList.addEventListener('click', (event) => {
        if (event.target && event.target.matches('li.task')) {
            event.target.classList.toggle('selected');
        }
    });
});
