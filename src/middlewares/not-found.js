import { HttpError } from '../utils/http-error.js';
export const notFound = (req) => { throw HttpError.notFound(`Ruta no encontrada: ${req.method} ${req.originalUrl}`); };