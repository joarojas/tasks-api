import bcrypt from 'bcryptjs';
import { HttpError } from '../../utils/http-error.js';
import { signToken } from '../../lib/jwt.js';
import { env } from '../../config/env.js';

export function createAuthService(users) {
  return {
    async register({ email, password }) {
      if (await users.findByEmail(email)) throw HttpError.conflict('El correo ya está registrado');
      return users.create({ email, password_hash: await bcrypt.hash(password, 10) });
    },
    async login({ email, password }) {
      const user = await users.findByEmail(email);
      const ok = user && (await bcrypt.compare(password, user.password_hash));
      if (!ok) throw HttpError.unauthorized('Credenciales inválidas');
      return { accessToken: signToken(user), tokenType: 'Bearer', expiresIn: env.JWT_EXPIRES_IN };
    },
  };
}