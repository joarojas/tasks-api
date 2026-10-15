import { HttpError } from '../utils/http-error.js';
import { verifyToken } from '../lib/jwt.js';

export function requireAuth(req, _res, next) {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');
  if (scheme !== 'Bearer' || !token) throw HttpError.unauthorized('Token faltante');
  try {
    const p = verifyToken(token);
    req.user = { id: p.sub, email: p.email };
    next();
  } catch {
    throw HttpError.unauthorized('Token inválido o expirado');
  }
}