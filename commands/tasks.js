const { default: InternalError } = require("../config/internalError");
const { default: STATUS } = require("../constants/status");
const { taskRepository } = require("../repository/tasks");
const { validate } = require("../utils/validation");

function createTaskCommand(args) {
  validate.validateText(...args);
  validate.validateMinLength(args.join(" "), 5);

  const tasks = taskRepository.listTasks();

  const task = {
    id: parseInt(tasks.length + 1),
    description: args.join(" "),
    status: STATUS.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  taskRepository.addTask(task);
}

function listTasksCommand(args) {
  const [status] = args;

  if (status) validate.validateTaskStatus(status);

  const tasks = taskRepository.listTasks(status);

  if (tasks.length === 0) {
    console.log("Any task found.");
    return;
  }

  tasks.forEach((task, index) => {
    console.log(`${index + 1} - 
        ID: ${task.id}
        Descrição: ${task.description}
        Status: ${task.status}
        Data de criação: ${task.createdAt}
        Data de atualização: ${task.updatedAt}
        `);
  });
}

function updateTaskCommand(args) {
  let [id, ...rest] = args;

  validate.validateText(...rest);
  validate.validateMinLength(rest.join(" "), 5);

  id = parseInt(id);

  const task = taskRepository.findTaskById(id);

  if (!task) {
    throw new InternalError("Task not found.");
  }

  task.description = rest.join(" ");
  task.updatedAt = new Date().toISOString();

  taskRepository.updateTask(id, task);
}

const taskService = {
  createTaskCommand,
  listTasksCommand,
  updateTaskCommand,
};

const acceptTaskCommands = {
  add: (args) => taskService.createTaskCommand(args),
  list: (args) => taskService.listTasksCommand(args),
  update: (args) => taskService.updateTaskCommand(args),
};

module.exports = { acceptTaskCommands };
