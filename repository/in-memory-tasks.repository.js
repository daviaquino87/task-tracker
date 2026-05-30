const InternalError = require("../config/internalError");
const { normalizeStatus } = require("../constants/status");

const tasks = [];

function matchesStatus(task, status) {
  const normalized = normalizeStatus(status);
  if (!normalized) return false;

  const taskStatus =
    task.status === "in_progress" ? "in-progress" : task.status;

  return taskStatus === normalized;
}

async function addTask(task) {
  tasks.push(task);
}

async function listTasks(status) {
  if (status) {
    return tasks.filter((task) => matchesStatus(task, status));
  }

  return tasks;
}

async function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

async function updateTask(id, task) {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks[index] = task;
}

async function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks.splice(index, 1);
}

function getNextId(taskList) {
  if (taskList.length === 0) return 1;
  return Math.max(...taskList.map((t) => t.id)) + 1;
}

const inMemoryTasksRepository = {
  addTask,
  listTasks,
  updateTask,
  findTaskById,
  deleteTask,
  getNextId,
};

module.exports = { inMemoryTasksRepository };
