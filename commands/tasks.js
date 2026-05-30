const { taskRepository } = require("../repository/tasks");
const { validateText } = require("../utils/validation");

function createTaskCommand(args) {
  validateText(...args);

  const task = args.join(" ");
  taskRepository.addTask(task);
}

function listTasksCommand() {
  taskRepository.listTasks();
}

const taskService = {
  createTaskCommand,
  listTasksCommand,
};

const acceptTaskCommands = {
  add: (args) => taskService.createTaskCommand(args),
  list: () => taskService.listTasksCommand(),
};

module.exports = { acceptTaskCommands };
