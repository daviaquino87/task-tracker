const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

const acceptCommands = {
  add: (task) => addTask(task),
  list: () => listTasks(),
};

function addTask(task) {
  if (task.length < 5) {
    console.log("A tarefa tem que ter pelo menos 5 caracteres");
    return;
  }

  tasks.push(task);
}

function listTasks() {
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ${task}`);
  });
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function start() {
  while (true) {
    const input = await askQuestion("> ");

    const [command, ...args] = input.split(" ");

    if (!command || !acceptCommands.hasOwnProperty(command)) {
      console.log("Invalid command");
      continue;
    }

    acceptCommands[command](...args);
  }
}

start();
