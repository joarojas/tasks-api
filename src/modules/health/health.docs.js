import { errorResponse, jsonResponse } from '../../docs/helpers.js';

export const healthDocs = {
  tags: [{ name: 'Health', description: 'Estado del servicio' }],
  schemas: {},
  paths: {
    '/health': { get: { tags: ['Health'], summary: 'Estado de la API',
      responses: { 200: jsonResponse('OK', { type: 'object', properties: { status: { type: 'string', example: 'ok' } } }) } } },
    '/health/db': { get: { tags: ['Health'], summary: 'Estado de la base de datos',
      responses: { 200: jsonResponse('BD disponible', { type: 'object' }), 503: errorResponse('BD no disponible') } } },
  },
};