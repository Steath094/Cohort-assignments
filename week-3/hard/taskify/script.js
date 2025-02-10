const todoBoard = {
    todosList: [{ title: 'My name is shady', description: 'Fuck You', category: 'Easy' }],
    inProgressList: [{ title: "Write API", description: "Develop backend API", category: 'Medium' }],
    underReviewList: [{ title: "Build UI", description: "Create the main UI components", category: 'Urgent' },
        { title: "Fix Bug", description: "Resolve login issue", category: 'Easy' }],
    finishedList: [{ title: "Fix Bug", description: "Creating Login Issue", category: 'Easy' }],
};

function render() {
    for (const key in todoBoard) {
        if (Object.prototype.hasOwnProperty.call(todoBoard, key)) {
            const list = document.querySelector('.' + key);
            list.innerHTML = ''; // Clear existing todos
            todoBoard[key].forEach(item => {
                list.innerHTML += `
                <div class="todo ${key + 'Item'}" draggable="true">
                    <div class="title">${item.title}</div>
                    <div class="description"><p>${item.description}</p></div>
                    <div class="utils">
                        <div class="left">
                            <div class="type">${item.category}</div>
                            <div class="time"><span class="colorGrey"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#434343"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg></span> <span>13:50:40</span></div>
                        </div>
                        <div class="right">12 hrs ago</div>
                    </div>
                </div>`;
            });
        }
    }
    let items = document.querySelectorAll('.type');
    items.forEach(item=>{
        if (item.innerText=='Easy') {
            item.style.backgroundColor='#FFD700'
        }
        else if (item.innerText=='Urgent') {
            item.style.backgroundColor='Red'
        }
        
    })
    applyDragAndDrop(); // Apply drag & drop listeners to new todos
}

function applyDragAndDrop() {
    let items = document.querySelectorAll('.todo');
    items.forEach(item => {
        item.setAttribute("draggable", "true"); // Ensure draggable attribute

        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('over');
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    document.querySelectorAll('.todo').forEach(item => {
        item.classList.remove('over');
    });
}

function handleDrop(e) {
    e.stopPropagation();
    const src = dragSrcEl.classList[1].slice(0, -4); // Source category
    const dest = this.classList[1].slice(0,-4); // Target category
    const title = dragSrcEl.querySelector(".title").innerText;
    const description = dragSrcEl.querySelector(".description p").innerText;

    if (dragSrcEl !== this) {
        const index = todoBoard[src].findIndex(todo =>
            todo.title === title && todo.description === description
        );

        if (index !== -1) {
            const [movedTodo] = todoBoard[src].splice(index, 1);
            todoBoard[dest].push(movedTodo);
        }
    }
    render();
}

function addTask() {
    const form = document.querySelector(".todo-form");
    const title = form.children[0].value.trim();
    const description = form.children[1].value.trim();
    const category = form.children[2].value.trim();

    if (title === '' || description === '') return;

    todoBoard.todosList.push({ title, description, category });
    form.children[0].value = '';
    form.children[1].value = '';
    render();
}

document.addEventListener("DOMContentLoaded", () => {
    render();
});
