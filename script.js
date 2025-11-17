let addInp = document.querySelector("#addInp");
let addBtn = document.querySelector("#addBtn");
let ul = document.querySelector("ul");

function loadTodos() {
    let todos = localStorage.getItem("todos");
    ul.innerHTML = "";
    if (todos === null || todos == "[]") {
        let li = document.createElement("li");
        li.textContent = "No Todo yet...";
        ul.appendChild(li);
    } else {
        todos = JSON.parse(todos);
        todos.forEach((todo, index) => {
            let li = document.createElement("li");
            li.id = `li${index}`;
            if (todo.over) {
                li.innerHTML = `<span class="over">${todo.data}</span> <div>
                <button class="editTodo">Edit</button>
                <button class="delTodo">Delete</button>
                </div>`;
            } else {
                li.innerHTML = `<span>${todo.data}</span> <div>
                <button class="editTodo">Edit</button>
                <button class="delTodo">Delete</button>
                </div>`;
            }
            ul.appendChild(li);
        });
    }
}

loadTodos();

function addTodo() {
    let data = addInp.value.trim();
    if (data === "") {
        addInp.setAttribute("placeholder", "Please Enter some data...");
    } else {
        addInp.setAttribute("placeholder", "Enter your todo here...");
        let todos = localStorage.getItem("todos");
        if (todos === null) {
            todos = new Array;
        } else {
            todos = JSON.parse(todos);
        }
        todos.push({
            data,
            over: false
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    }
    addInp.value = "";
}

addInp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
})

addBtn.addEventListener("click", () => {
    addTodo();
});

ul.addEventListener("click", (e) => {
    if (e.target.matches(".delTodo")) {
        let todos = JSON.parse(localStorage.getItem("todos"));
        let index = e.target.closest("li").id.split("li")[1];
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    } else if (e.target.matches(".editTodo")) {
        let editBtn = e.target;
        let todos = JSON.parse(localStorage.getItem("todos"));
        let li = editBtn.closest('li');
        let index = li.id.split("li")[1];
        let span = li.querySelector("span");
        let input = document.createElement("input");
        input.value = todos[index].data;
        editBtn.setAttribute("disabled", "");
        li.replaceChild(input, span);
        function saveEdit() {
            if (input.value.trim() === "") {
                input.setAttribute("placeholder", "Please Enter some data...");
            } else {
                todos[index].data = input.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                loadTodos();
            }
        }
        input.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                saveEdit();
            }
        })
        input.addEventListener("blur", () => {
            saveEdit();
        })
    } else if (e.target.matches("span")) {
        let span = e.target;
        let todos = JSON.parse(localStorage.getItem("todos"));
        let li = span.closest('li');
        let index = li.id.split("li")[1];
        if (todos[index].over === false) {
            todos[index].over = true;
        } else {
            todos[index].over = false;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        loadTodos();
    }
});