const Task = require("../models/taskModel");

exports.getTasks = (req, res) => {
  Task.getAll((err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.addTask = (req, res) => {
  const { title, due_date } = req.body;
  Task.create(title, due_date || null, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, title, due_date });
  });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
};

exports.completeTask = (req, res) => {
  Task.complete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send();
  });
};
