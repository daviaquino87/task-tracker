const { default: InternalError } = require("./config/internalError");
const { askQuestion } = require("./config");
const { acceptTaskCommands } = require("./commands/tasks");

async function start() {
  while (true) {
    try {
      const input = await askQuestion("> ");

      const [command, ...args] = input.split(" ");

      if (!command || !acceptTaskCommands.hasOwnProperty(command)) {
        console.log("Invalid command");
        continue;
      }

      acceptTaskCommands[command](args);
    } catch (error) {
      if (error instanceof InternalError) {
        console.log(error.message);
        return;
      }

      console.error("Unexpected error", error);
    } finally {
      continue;
    }
  }
}

start();
