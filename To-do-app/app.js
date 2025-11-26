const input = document.querySelector('#taskinput');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('tasklist');

function addTask() {
  const task = input.value.trim();
  if (task === '') return;

  const li = document.createElement('li');
  li.textContent = task;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  list.appendChild(li);
  input.value = '';
}

addBtn.addEventListener('click', addTask);

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
