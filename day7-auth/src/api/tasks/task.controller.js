const taskService = require('./task.service');
const validations = require('../../validations/task.validation');

async function createTask(req, res, next) {
  try {
    const { error } = validations.createTask.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const data = { ...req.body, userId: req.userId };
    const task = await taskService.createTask(data);
    res.status(201).json(task);
  } catch (err) { next(err); }
}

async function getTasks(req, res, next) {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    // only allow fetching own tasks unless admin logic added
    query.userId = req.userId;
    const tasks = await taskService.getTasks(query);
    res.json(tasks);
  } catch (err) { next(err); }
}

async function getTask(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    res.json(task);
  } catch (err) { next(err); }
}

async function updateTask(req, res, next) {
  try {
    const { error } = validations.updateTask.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    const updated = await taskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
}

async function deleteTask(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    await taskService.deleteTask(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}

async function markComplete(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    const updated = await taskService.markComplete(req.params.id);
    res.json(updated);
  } catch (err) { next(err); }
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask, markComplete };
