const { default: InternalError } = require("../config/internalError");

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

function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function updateTask(id, task) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks[index] = task;
}

const taskRepository = {
  addTask,
  listTasks,
  updateTask,
  findTaskById,
};

module.exports = { taskRepository };
