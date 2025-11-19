// src/utility/responses.js
function success(data, meta = {}) {
  return { status: 'success', data, meta };
}

function created(resource) {
  return { status: 'success', data: resource, message: 'Created' };
}

function error(msg) {
  return { status: 'error', message: msg };
}

module.exports = { success, created, error };
