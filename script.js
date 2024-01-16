let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

let display = document.querySelector('.display-to-do');
let add = document.querySelector('.js-add-button');

add.addEventListener('click', () => {
    addToDo();
});


function addToDo(){
    const inputToDo = document.querySelector('.js-input-to-do');
    const inputDate = document.querySelector('.js-input-date');
    let todoInput = inputToDo.value;
    let dateInput = inputDate.value;
    if(!todoInput && !dateInput){
        alert("Please enter todo and date!!!");
        return;
    } else if(!todoInput && dateInput){
        alert("Please enter todo first");
        return;
    }

    if(checkDuplicate(todoInput, dateInput)){
        alert('To Do already exists!');
        return;
    }
    
    todoList.push({
        todo: todoInput,
        date: dateInput,
        checked: false
    });
    inputToDo.value = '';
    localStorage.setItem('todoList', JSON.stringify(todoList));
    displayToDo();
}

function displayToDo(){
    let todoListhtml = '';

    rearrangeList();

    todoList.forEach((todo) => {
        let html = '';
        if(todo.checked){
            html = `
            <div class="display">
            <input type="checkbox" class="checkToDo js-check-to-do" checked>
            <div class="display-task"><strike class="blurred">${todo.todo}</strike></div>
            <div class="display-date"><strike class="blurred">${todo.date}</strike></div>
            <button class="delete-to-do js-delete-button"><img src = "Images/delete.svg" alt="delete-button" class="delete"></button>
            </div>
        `;
        }
        else{
            html = `
            <div class="display">
            <input type="checkbox" class="checkToDo js-check-to-do">
            <div class="display-task">${todo.todo}</div>
            <div class="display-date">${todo.date}</div>
            <button class="delete-to-do js-delete-button"><img src="Images/delete.svg" alt="delete-button" class="delete"></button>
            </div>
        `;
        }
        todoListhtml += html;
    });

    document.querySelector('.display-to-do').innerHTML = todoListhtml;

    const checkBoxes = document.querySelectorAll('.js-check-to-do');
    checkBoxes.forEach((checkBox, index) => {
        checkBox.addEventListener('click', () => {
            let isChecked = checkBox.checked;
            if(isChecked){
                todoList[index].checked= true;
            }
            else{
                todoList[index].checked = false;
            }
            displayToDo();
            localStorage.setItem('todoList', JSON.stringify(todoList));
        })
    })

    const buttons = document.querySelectorAll('.js-delete-button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            todoList.splice(index, 1);
            localStorage.setItem('todoList', JSON.stringify(todoList));
            displayToDo();
        });
    });
}

displayToDo();

function checkDuplicate(todoInput, dateInput){
    let exists = false;
    todoList.forEach((todo) => {
        if(todo.todo === todoInput){
            exists = true;
        }
    });
    return exists;
}

function rearrangeList(){
    const rearrange = [];
    let j=0,k=todoList.length-1;
    for(let i=0;i<todoList.length;i++){
        if(!todoList[i].checked){
            rearrange[j]=todoList[i];
            j++;
        } else {
            rearrange[k]=todoList[i];
            k--;
        }
    }
    todoList = rearrange.slice();
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addToDo();
    }
});
