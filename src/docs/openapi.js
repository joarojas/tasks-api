import { healthDocs } from '../modules/health/health.docs.js';
import { tasksDocs } from '../modules/tasks/tasks.docs.js';
import { authDocs } from '../modules/auth/auth.docs.js';

const modules = [healthDocs, authDocs, tasksDocs];

export const openapi = {
  openapi: '3.1.0',
  info: { title: 'Tasks API', version: '1.0.0' },
  servers: [{ url: '/api' }],
  tags: modules.flatMap((m) => m.tags),
  paths: Object.assign({}, ...modules.map((m) => m.paths)),
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: {
      Error: { type: 'object', properties: { message: { type: 'string' }, details: {} } },
      ...Object.assign({}, ...modules.map((m) => m.schemas)),
    },
  },
};