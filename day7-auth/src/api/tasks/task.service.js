const Task = require('../../models/task.model');

async function createTask(data) {
  return await Task.create(data);
}

async function getTasks(query = {}) {
  return await Task.find(query).sort({ createdAt: -1 });
}

async function getTaskById(id) {
  return await Task.findById(id);
}

async function updateTask(id, updates) {
  return await Task.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteTask(id) {
  return await Task.findByIdAndDelete(id);
}

async function markComplete(id) {
  return await Task.findByIdAndUpdate(id, { status: 'complete' }, { new: true });
}

module.exports = {
  createTask, getTasks, getTaskById, updateTask, deleteTask, markComplete
};
