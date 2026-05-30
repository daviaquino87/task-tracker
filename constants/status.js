const STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

const LIST_STATUS_ALIASES = {
  todo: STATUS.TODO,
  done: STATUS.DONE,
  "in-progress": STATUS.IN_PROGRESS,
  in_progress: STATUS.IN_PROGRESS,
};

function normalizeStatus(status) {
  if (!status) return null;
  const key = status.toLowerCase();
  return LIST_STATUS_ALIASES[key] ?? null;
}

module.exports = { STATUS, LIST_STATUS_ALIASES, normalizeStatus };
