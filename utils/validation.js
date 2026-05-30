const { default: InternalError } = require("../config/internalError");
const { default: STATUS } = require("../constants/status");

function validateText(...args) {
  if (
    !args[0].startsWith('"') ||
    !args[args.length - 1].endsWith('"') ||
    !args[args.length - 1] === '"'
  ) {
    throw new InternalError("The text must be between double quotes.");
  }
}

function validateTaskStatus(status) {
  if (!Object.values(STATUS).includes(status.toLowerCase())) {
    throw new InternalError(
      `Invalid status. Status must be: ${Object.values(STATUS).join(", ")}`,
    );
  }
}

function validateMinLength(field, length) {
  if (field.length < length) {
    throw new InternalError(
      `The input must be less than ${length} characters.`,
    );
  }
}

const validate = {
  validateText,
  validateTaskStatus,
  validateMinLength,
};

module.exports = { validate };
