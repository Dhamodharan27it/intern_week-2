const Task = require('../models/Task');

async function getTasks(req, res, next) {
  try { res.json(await Task.find().sort({ createdAt: -1 })); } catch (error) { next(error); }
}

async function createTask(req, res, next) {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.create({ title, description, completed });
    res.status(201).json(task);
  } catch (error) { next(error); }
}

async function updateTask(req, res, next) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) { next(error); }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
