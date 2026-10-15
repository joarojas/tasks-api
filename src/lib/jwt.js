import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signToken = (user) =>
  jwt.sign({ email: user.email }, env.JWT_SECRET, { subject: user.id, expiresIn: env.JWT_EXPIRES_IN });
export const verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);