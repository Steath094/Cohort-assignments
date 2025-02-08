function addTask(){
    const form = document.querySelector(".todo-form")
    const title = form.children[0].value;
    const description = form.children[1].value;
    const category = form.children[2].value;
    if (title.trim()=='' || description.trim()=='') {
        return
    }
    const todoList = document.querySelector('.todoslist')
    todoList.innerHTML+= `
                <div class="todo">
                    <div class="title">
                        ${title}
                    </div>
                    <div class="description">
                        <p>${description} </p>
                    </div>
                    <div class="utils">
                        <div class="left">
                            <div class="type">${category}</div>
                            <div class="time"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808080"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>13:50:40</div>
                        </div>
                        <div class="right">12 hrs ago</div>
                    </div>
                </div>
    `
    form.children[0].value='';
    form.children[1].value='';
    
}