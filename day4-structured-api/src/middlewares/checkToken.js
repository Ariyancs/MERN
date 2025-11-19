// logger, token-checker, centralized error handler
function logger(req, res, next) {
  const ts = new Date().toISOString();
  const body = Object.keys(req.body || {}).length ? ` Body: ${JSON.stringify(req.body)}` : '';
  console.log(`${ts} - ${req.method} ${req.originalUrl}${body}`);
  next();
}

function checkToken(req, res, next) {
  const token = req.header('x-api-token');
  if (!token) {
    const err = new Error('Missing API token');
    err.status = 401;
    return next(err);
  }
  if (token !== 'mysecrettoken') {
    const err = new Error('Invalid API token');
    err.status = 403;
    return next(err);
  }
  next();
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  console.error(`ERROR ${status} - ${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(status).json({
    error: { message: err.message, ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}) }
  });
}

module.exports = { logger, checkToken, errorHandler };
