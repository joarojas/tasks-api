import { z } from 'zod';
import { HttpError } from '../utils/http-error.js';

export const validate = (schema, source = 'body') => (req, _res, next) => {
  const r = schema.safeParse(req[source]);
  if (!r.success) throw HttpError.badRequest('Datos inválidos', z.flattenError(r.error));
  Object.assign(req[source], r.data);
  next();
};