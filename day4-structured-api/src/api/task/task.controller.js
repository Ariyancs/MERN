const TaskService = require('./task.service');
const responses = require('../../utility/responses');

async function getAllTasks(req, res, next) {
  try {
    const tasks = await TaskService.getAll();
    res.status(200).json(responses.success(tasks));
  } catch (err) { next(err); }
}

async function getTaskById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const task = await TaskService.getById(id);
    if (!task) { const e = new Error('Task not found'); e.status = 404; throw e; }
    res.json(responses.success(task));
  } catch (err) { next(err); }
}

async function createTask(req, res, next) {
  try {
    const created = await TaskService.create(req.body);
    res.status(201).json(responses.created(created));
  } catch (err) { next(err); }
}

async function updateTask(req, res, next) {
  try {
    const updated = await TaskService.update(Number(req.params.id), req.body);
    if (!updated) { const e = new Error('Task not found'); e.status = 404; throw e; }
    res.json(responses.success(updated));
  } catch (err) { next(err); }
}

async function deleteTask(req, res, next) {
  try {
    const removed = await TaskService.remove(Number(req.params.id));
    if (!removed) { const e = new Error('Task not found'); e.status = 404; throw e; }
    res.json(responses.success(removed));
  } catch (err) { next(err); }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
