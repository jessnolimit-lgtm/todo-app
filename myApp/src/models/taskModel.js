const db = require("../config/db");

const Task = {
  getAll: (cb) => {
    db.query("SELECT * FROM tasks ORDER BY due_date IS NULL, due_date, id DESC", cb);
  },
  create: (title, due_date, cb) => {
    db.query("INSERT INTO tasks (title, due_date) VALUES (?, ?)", [title, due_date], cb);
  },
  delete: (id, cb) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], cb);
  },
  complete: (id, cb) => {
    db.query("UPDATE tasks SET completed = 1 WHERE id = ?", [id], cb);
  }
};

module.exports = Task;
