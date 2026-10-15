import { errorResponse, idParam, jsonBody, jsonResponse, secure, toSchema } from '../../docs/helpers.js';
import { taskSchema, createTaskSchema, updateTaskSchema } from './tasks.schema.js';

const task = { $ref: '#/components/schemas/Task' };
const bad = errorResponse('Datos inválidos');
const nf = errorResponse('Tarea no encontrada');

export const tasksDocs = {
  tags: [{ name: 'Tasks', description: 'CRUD de tareas' }],
  schemas: {
    Task: toSchema(taskSchema),
    CreateTask: toSchema(createTaskSchema),
    UpdateTask: toSchema(updateTaskSchema),
  },
  paths: secure({
    '/tasks': {
      get: { tags: ['Tasks'], summary: 'Listar tareas', responses: { 200: jsonResponse('Lista', { type: 'array', items: task }) } },
      post: { tags: ['Tasks'], summary: 'Crear tarea', requestBody: jsonBody({ $ref: '#/components/schemas/CreateTask' }),
        responses: { 201: jsonResponse('Creada', task), 400: bad } },
    },
    '/tasks/{id}': {
      parameters: [idParam],
      get: { tags: ['Tasks'], summary: 'Obtener tarea', responses: { 200: jsonResponse('Tarea', task), 400: bad, 404: nf } },
      patch: { tags: ['Tasks'], summary: 'Actualizar tarea', requestBody: jsonBody({ $ref: '#/components/schemas/UpdateTask' }),
        responses: { 200: jsonResponse('Actualizada', task), 400: bad, 404: nf } },
      delete: { tags: ['Tasks'], summary: 'Eliminar tarea', responses: { 204: { description: 'Eliminada' }, 400: bad, 404: nf } },
    },
  }),
};