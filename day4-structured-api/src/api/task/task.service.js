let tasks = [
  { id: 1, title: 'Learn middleware', description: 'Read about next()', completed: false },
  { id: 2, title: 'Build Task API', description: 'Router-controller-service', completed: false }
];

function getNextId() { return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1; }

async function getAll() { return tasks; }
async function getById(id) { return tasks.find(t => t.id === id) || null; }
async function create(payload) {
  if (!payload || !payload.title) { const e = new Error('Validation: title required'); e.status = 400; throw e;}
  const newTask = { id: getNextId(), title: payload.title, description: payload.description || '', completed: !!payload.completed };
  tasks.push(newTask); return newTask;
}
async function update(id, payload) {
  const idx = tasks.findIndex(t => t.id === id); if (idx === -1) return null;
  const updated = { ...tasks[idx], ...(payload.title !== undefined ? { title: payload.title } : {}), ...(payload.description !== undefined ? { description: payload.description } : {}), ...(payload.completed !== undefined ? { completed: !!payload.completed } : {}) };
  tasks[idx] = updated; return updated;
}
async function remove(id) { const idx = tasks.findIndex(t => t.id === id); if (idx === -1) return null; return tasks.splice(idx,1)[0]; }

module.exports = { getAll, getById, create, update, remove };
