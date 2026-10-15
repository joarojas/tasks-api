import { errorResponse, jsonBody, jsonResponse, toSchema } from '../../docs/helpers.js';
import { credentialsSchema } from './auth.schema.js';

const creds = jsonBody({ $ref: '#/components/schemas/Credentials' });

export const authDocs = {
  tags: [{ name: 'Auth', description: 'Registro e inicio de sesión' }],
  schemas: { Credentials: toSchema(credentialsSchema) },
  paths: {
    '/auth/register': { post: { tags: ['Auth'], summary: 'Registrar usuario', requestBody: creds, responses: {
      201: jsonResponse('Usuario creado', { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, created_at: { type: 'string' } } }),
      400: errorResponse('Datos inválidos'),
      409: errorResponse('El correo ya está registrado'),
    } } },
    '/auth/login': { post: { tags: ['Auth'], summary: 'Iniciar sesión', requestBody: creds, responses: {
      200: jsonResponse('Token JWT', { type: 'object', properties: {
        accessToken: { type: 'string' }, tokenType: { type: 'string', example: 'Bearer' }, expiresIn: { type: 'string', example: '1h' } } }),
      400: errorResponse('Datos inválidos'),
      401: errorResponse('Credenciales inválidas'),
    } } },
  },
};