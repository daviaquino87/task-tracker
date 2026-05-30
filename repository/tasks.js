const tasks = [];

function addTask(task) {
  if (task.length < 5) {
    console.log("A tarefa tem que ter pelo menos 5 caracteres");
    return;
  }

  tasks.push(task);
}

function listTasks() {
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ${task}`);
  });
}

const taskRepository = {
  addTask,
  listTasks,
};

module.exports = { taskRepository };
