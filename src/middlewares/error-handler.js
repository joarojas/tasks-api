export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? 'Error interno' : err.message, details: err.details });
}