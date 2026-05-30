const InternalError = require("../config/internalError");
const { LIST_STATUS_ALIASES } = require("../constants/status");

function stripQuotes(text) {
  const trimmed = text.trim();
  if (
    trimmed.length >= 2 &&
    trimmed.startsWith('"') &&
    trimmed.endsWith('"')
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseDescription(args) {
  if (!args.length) {
    throw new InternalError("The description must not be empty.");
  }

  const description = stripQuotes(args.join(" "));

  if (!description.length) {
    throw new InternalError("The description must not be empty.");
  }

  return description;
}

function validateMinLength(field, length) {
  if (field.length < length) {
    throw new InternalError(
      `The input must be at least ${length} characters.`,
    );
  }
}

function validateTaskStatus(status) {
  const key = status.toLowerCase();
  if (!LIST_STATUS_ALIASES[key]) {
    throw new InternalError(
      `Invalid status. Status must be: todo, in-progress, done`,
    );
  }
}

function validateId(id) {
  const parsed = parseInt(id, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    throw new InternalError("Invalid task ID.");
  }
  return parsed;
}

const validate = {
  parseDescription,
  validateMinLength,
  validateTaskStatus,
  validateId,
};

module.exports = { validate };
