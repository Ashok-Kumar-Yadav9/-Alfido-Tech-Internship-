
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const noTasks = document.getElementById('noTasks');

function addTask(text) {
  const li = document.createElement('li');
  li.className =
    'task-item flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      textSpan.classList.add('line-through', 'text-gray-400');
      li.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        if (confirm('Marked as complete. Remove this task?')) {
          removeTask(li);
        } else {
          checkbox.checked = false;
          textSpan.classList.remove('line-through', 'text-gray-400');
        }
      }, 500);
    }
  });

  const textSpan = document.createElement('span');
  textSpan.textContent = text;
  textSpan.className =
    'flex-1 text-lg font-medium cursor-pointer hover:text-purple-600 transition';
  textSpan.addEventListener('click', () => {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  deleteBtn.className =
    'delete-btn bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md';
  deleteBtn.addEventListener('click', () => removeTask(li));

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  updateNoTasks();
  taskInput.focus();
}

function removeTask(li) {
  li.classList.add('fade-out');
  setTimeout(() => {
    taskList.removeChild(li);
    updateNoTasks();
  }, 400);
}

function updateNoTasks() {
  noTasks.style.display = taskList.children.length === 0 ? 'block' : 'none';
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = '';
    taskInput.focus();
  }
});

updateNoTasks();