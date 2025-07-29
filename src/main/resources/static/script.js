document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const apiUrl = '/api/tasks';

    // --- Fetch and display all tasks ---
    async function fetchTasks() {
        try {
            const response = await fetch(apiUrl);
            const tasks = await response.json();
            taskList.innerHTML = ''; // Clear the list before repopulating
            tasks.sort((a, b) => a.id - b.id); // Sort tasks by ID
            tasks.forEach(task => {
                displayTask(task);
            });
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    }

    // --- Display a single task in the list ---
    function displayTask(task) {
        const item = document.createElement('li');
        item.className = 'task-item';
        if (task.completed) {
            item.classList.add('completed');
        }
        item.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id, !task.completed));

        const span = document.createElement('span');
        span.textContent = task.description;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        item.appendChild(checkbox);
        item.appendChild(span);
        item.appendChild(deleteBtn);
        taskList.appendChild(item);
    }

    // --- Add a new task ---
    async function addTask() {
        const description = taskInput.value.trim();
        if (description === '') {
            alert('Please enter a task description.');
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: description, completed: false })
            });
            const newTask = await response.json();
            displayTask(newTask);
            taskInput.value = ''; // Clear input field
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    }

    // --- Toggle task completion status ---
    async function toggleTaskCompletion(id, isCompleted) {
        const item = document.querySelector(`li[data-id='${id}']`);
        const description = item.querySelector('span').textContent;

        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: description, completed: isCompleted })
            });
            await fetchTasks(); // Refresh the list to show the change
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }

    // --- Delete a task ---
    async function deleteTask(id) {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            const item = document.querySelector(`li[data-id='${id}']`);
            item.remove();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    }

    // --- Event Listeners ---
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial load of tasks
    fetchTasks();
});