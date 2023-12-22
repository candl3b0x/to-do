const input = document.querySelector("#input"),
  filters = document.querySelectorAll(".filters span"),
  taskBox = document.querySelector(".task-box"),
  clear = document.querySelector(".clear-btn"),
  addButton = document.querySelector(".btn");

let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list"));

//span click events
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

// adding task with the  ADD button
const addTask = () => {
  let userTask = input.value.trim();

  if (userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };

      todos.push(taskInfo);
    } else {
      isEditTask = false;
      addButton.innerHTML = "Add";
      todos[editId].name = userTask;
    }
    input.value = "";
    saveData();
    showTodo(document.querySelector("span.active").id);
  }
};

//adding task with enter key
input.addEventListener("keyup", (e) => {
  let userTask = input.value.trim();

  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };

      todos.push(taskInfo);
    } else {
      isEditTask = false;
      addButton.innerHTML = "Add";
      todos[editId].name = userTask;
    }
    input.value = "";
    saveData();
    showTodo(document.querySelector("span.active").id);
  }
});

// functin to display the todo
const showTodo = (filter) => {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task flex ${todo.status}">
            <label for="${id}" >
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>                        
                    </label><p >${todo.name}</p>
              <div class="settings">
                 <i class="fa-solid fa-pen-to-square" onclick='editTask(${id}, "${todo.name}")'></i>
                <i class="fa-solid fa-trash" onclick='deleteTask(${id}, "${filter}")'></i>
              </div>
            </li>`;
      }
    });
  }

  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  input.value = "";
};

// functin to display the todo on initial run
showTodo("all");

//to clear the list and todos[]
clear.addEventListener("click", () => {
  console.log("cleared");
  taskBox.innerHTML = "";
  todos = [];
  saveData();
});

//fucntion to save data
const saveData = () => {
  localStorage.setItem("todo-list", JSON.stringify(todos));
};

//check button click event
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement;

  if (selectedTask.checked) {
    taskName.parentElement.classList.add("completed");
    taskName.parentElement.classList.remove("pending");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.parentElement.classList.remove("completed");
    taskName.parentElement.classList.add("pending");
    todos[selectedTask.id].status = "pending";
  }
  saveData();
}

//edit button click event
function editTask(taskId, textName) {
  console.log(taskId);
  addButton.innerHTML = "Save";
  editId = taskId;
  isEditTask = true;
  input.value = textName;
  input.focus();
}

//delete button click event
function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(filter);
}
