import { z } from 'zod';

export const toSchema = (s) => { const { $schema, ...r } = z.toJSONSchema(s, { io: 'input' }); return r; };
export const jsonBody = (schema) => ({ required: true, content: { 'application/json': { schema } } });
export const jsonResponse = (description, schema) => ({ description, content: { 'application/json': { schema } } });
export const errorResponse = (description) => jsonResponse(description, { $ref: '#/components/schemas/Error' });
export const idParam = { name: 'id', in: 'path', required: true, schema: { type: 'integer', example: 1 } };

// Marca los endpoints como protegidos con JWT (paso 7)
export function secure(paths) {
  const result = {};
  for (const [path, item] of Object.entries(paths)) {
    result[path] = {};
    for (const [key, value] of Object.entries(item)) {
      result[path][key] = key === 'parameters' ? value : {
        ...value,
        security: [{ bearerAuth: [] }],
        responses: { ...value.responses, 401: errorResponse('Token faltante, inválido o expirado') },
      };
    }
  }
  return result;
}