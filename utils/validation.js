const { default: InternalError } = require("../config/internalError");

function validateText(...args) {
  if (
    !args[0].startsWith('"') ||
    !args[args.length - 1].endsWith('"') ||
    !args[args.length - 1] === '"'
  ) {
    throw new InternalError("The text must be between double quotes.");
  }
}

module.exports = { validateText };
