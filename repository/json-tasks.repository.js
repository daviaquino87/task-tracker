const fs = require("fs");
const path = require("path");
const InternalError = require("../config/internalError");
const { normalizeStatus } = require("../constants/status");

const TASKS_FILE = path.join(process.cwd(), "tasks.json");

function readTasks() {
  if (!fs.existsSync(TASKS_FILE)) {
    return [];
  }

  const content = fs.readFileSync(TASKS_FILE, "utf8");
  if (!content.trim()) {
    return [];
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new InternalError("Failed to read tasks file.");
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf8");
}

function matchesStatus(task, status) {
  const normalized = normalizeStatus(status);
  if (!normalized) return false;

  const taskStatus =
    task.status === "in_progress"
      ? "in-progress"
      : task.status;

  return taskStatus === normalized;
}

async function addTask(task) {
  const tasks = readTasks();
  tasks.push(task);
  writeTasks(tasks);
}

async function listTasks(status) {
  const tasks = readTasks();

  if (status) {
    return tasks.filter((task) => matchesStatus(task, status));
  }

  return tasks;
}

async function findTaskById(id) {
  const tasks = readTasks();
  return tasks.find((task) => task.id === id);
}

async function updateTask(id, task) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks[index] = task;
  writeTasks(tasks);
}

async function deleteTask(id) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new InternalError("Task not found.");
  }

  tasks.splice(index, 1);
  writeTasks(tasks);
}

function getNextId(tasks) {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((t) => t.id)) + 1;
}

const jsonTasksRepository = {
  addTask,
  listTasks,
  updateTask,
  findTaskById,
  deleteTask,
  getNextId,
};

module.exports = { jsonTasksRepository };
