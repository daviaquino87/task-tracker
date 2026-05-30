const tasks = [];

function addTask(task) {
  tasks.push(task);
}

function listTasks(status) {
  if (status) {
    return tasks.filter((task) => task.status === status.toLowerCase());
  }

  return tasks;
}

const taskRepository = {
  addTask,
  listTasks,
};

module.exports = { taskRepository };
