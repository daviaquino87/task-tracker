#!/usr/bin/env node

const InternalError = require("./config/internalError");
const { acceptTaskCommands } = require("./commands/tasks");

async function main() {
  const [, , command, ...args] = process.argv;

  if (!command || !Object.hasOwn(acceptTaskCommands, command)) {
    console.error("Invalid command.");
    console.error(
      "Usage: task-cli <add|list|update|delete|mark-in-progress|mark-done> [args]",
    );
    process.exit(1);
  }

  try {
    await acceptTaskCommands[command](args);
  } catch (error) {
    if (error instanceof InternalError) {
      console.error(error.message);
      process.exit(1);
    }

    console.error("Unexpected error:", error.message);
    process.exit(1);
  }
}

main();
