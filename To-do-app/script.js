const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

function addTask() {
  const taskText = input.value.trim();
  if (!taskText) {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;
  li.className = "border border-gray-300 rounded px-4 py-2";

  todoList.appendChild(li);
  input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
