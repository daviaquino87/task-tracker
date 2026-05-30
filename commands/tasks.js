const InternalError = require("../config/internalError");
const { STATUS } = require("../constants/status");
const { jsonTasksRepository } = require("../repository/json-tasks.repository");
const { validate } = require("../utils/validation");

const REPOSITORY = jsonTasksRepository;

async function createTaskCommand(args) {
  const description = validate.parseDescription(args);
  validate.validateMinLength(description, 1);

  const tasks = await REPOSITORY.listTasks();

  const task = {
    id: REPOSITORY.getNextId(tasks),
    description,
    status: STATUS.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await REPOSITORY.addTask(task);

  console.log(`Task added successfully (ID: ${task.id})`);
}

async function listTasksCommand(args) {
  const [status] = args;

  if (status) validate.validateTaskStatus(status);

  const tasks = await REPOSITORY.listTasks(status);

  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  tasks.forEach((task) => {
    const displayStatus =
      task.status === "in_progress" ? "in-progress" : task.status;
    console.log(
      `[${task.id}] ${task.description} - ${displayStatus} (created: ${task.createdAt}, updated: ${task.updatedAt})`,
    );
  });
}

async function updateTaskDescriptionCommand(args) {
  const [idArg, ...rest] = args;

  if (!idArg) {
    throw new InternalError("Task ID is required.");
  }

  const id = validate.validateId(idArg);
  const description = validate.parseDescription(rest);
  validate.validateMinLength(description, 1);

  const task = await REPOSITORY.findTaskById(id);

  if (!task) {
    throw new InternalError("Task not found.");
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();

  await REPOSITORY.updateTask(id, task);

  console.log(`Task updated successfully (ID: ${id})`);
}

async function deleteTaskCommand(args) {
  const [idArg] = args;

  if (!idArg) {
    throw new InternalError("Task ID is required.");
  }

  const id = validate.validateId(idArg);

  await REPOSITORY.deleteTask(id);

  console.log(`Task deleted successfully (ID: ${id})`);
}

async function markTaskInProgressCommand(args) {
  const [idArg] = args;

  if (!idArg) {
    throw new InternalError("Task ID is required.");
  }

  const id = validate.validateId(idArg);
  const task = await REPOSITORY.findTaskById(id);

  if (!task) {
    throw new InternalError("Task not found.");
  }

  task.status = STATUS.IN_PROGRESS;
  task.updatedAt = new Date().toISOString();

  await REPOSITORY.updateTask(id, task);

  console.log(`Task updated successfully (ID: ${id})`);
}

async function markTaskDoneCommand(args) {
  const [idArg] = args;

  if (!idArg) {
    throw new InternalError("Task ID is required.");
  }

  const id = validate.validateId(idArg);
  const task = await REPOSITORY.findTaskById(id);

  if (!task) {
    throw new InternalError("Task not found.");
  }

  task.status = STATUS.DONE;
  task.updatedAt = new Date().toISOString();

  await REPOSITORY.updateTask(id, task);

  console.log(`Task updated successfully (ID: ${id})`);
}

const acceptTaskCommands = {
  add: createTaskCommand,
  list: listTasksCommand,
  update: updateTaskDescriptionCommand,
  delete: deleteTaskCommand,
  "mark-in-progress": markTaskInProgressCommand,
  "mark-done": markTaskDoneCommand,
};

module.exports = { acceptTaskCommands };
