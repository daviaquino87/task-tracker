const { default: InternalError } = require("../config/internalError");
const { default: STATUS } = require("../constants/status");
const {
  inMemoryTasksRepository,
} = require("../repository/in-memory-tasks.repository");
const { validate } = require("../utils/validation");

const REPOSITORY = inMemoryTasksRepository;

async function createTaskCommand(args) {
  validate.validateText(...args);
  validate.validateMinLength(args.join(" "), 5);

  const tasks = await REPOSITORY.listTasks();

  const task = {
    id: parseInt(tasks.length + 1),
    description: args.join(" "),
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

async function updateTaskCommand(args) {
  let [id, ...rest] = args;

  validate.validateText(...rest);
  validate.validateMinLength(rest.join(" "), 5);

  id = parseInt(id);

  const task = await REPOSITORY.findTaskById(id);

  if (!task) {
    throw new InternalError("Task not found.");
  }

  task.description = rest.join(" ");
  task.updatedAt = new Date().toISOString();

  await REPOSITORY.updateTask(id, task);

  console.log(`Task updated successfully (ID: ${id})`);
}

async function deleteTaskCommand(args) {
  const [id] = args;

  await REPOSITORY.deleteTask(parseInt(id));

  console.log(`Task deleted successfully (ID: ${id})`);
}

const taskService = {
  createTaskCommand,
  listTasksCommand,
  updateTaskCommand,
  deleteTaskCommand,
};

const acceptTaskCommands = {
  add: async (args) => await taskService.createTaskCommand(args),
  list: async (args) => await taskService.listTasksCommand(args),
  update: async (args) => await taskService.updateTaskCommand(args),
  delete: async (args) => await taskService.deleteTaskCommand(args),
};

module.exports = { acceptTaskCommands };
