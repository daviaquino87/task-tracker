const { default: InternalError } = require("../config/internalError");

const tasks = [];

async function addTask(task) {
  tasks.push(task);
}

async function listTasks(status) {
  if (status) {
    return tasks.filter((task) => task.status === status.toLowerCase());
  }

  return tasks;
}

async function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

async function updateTask(id, task) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks[index] = task;
}

async function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks.splice(index, 1);
}

const inMemoryTasksRepository = {
  addTask,
  listTasks,
  updateTask,
  findTaskById,
  deleteTask,
};

module.exports = { inMemoryTasksRepository };
