const fs = require("fs");
const path = require("path");
const { default: InternalError } = require("../config/internalError");

const TASKS_FILE = path.join(__dirname, "..", "temp", "tasks.json");

function readTasks() {
  if (!fs.existsSync(TASKS_FILE)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf8"));
}

function writeTasks(tasks) {
  const dir = path.dirname(TASKS_FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks), "utf8");
}

async function addTask(task) {
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
}

async function listTasks(status) {
  const tasks = readTasks();

  if (status) {
    return tasks.filter((task) => task.status === status.toLowerCase());
  }

  return tasks;
}

async function findTaskById(id) {
  const tasks = readTasks();
  return tasks.find((task) => task.id === id);
}

async function updateTask(id, task) {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks[index] = task;
  writeTasks(tasks);
}

async function deleteTask(id) {
  const tasks = readTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks.splice(index, 1);
  writeTasks(tasks);
}

const jsonTasksRepository = {
  addTask,
  listTasks,
  updateTask,
  findTaskById,
  deleteTask,
};

module.exports = { jsonTasksRepository };
