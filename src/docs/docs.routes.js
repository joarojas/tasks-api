import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapi } from './openapi.js';

export const docsRouter = Router();
docsRouter.get('/openapi.json', (_req, res) => res.json(openapi));
docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(openapi, { swaggerOptions: { persistAuthorization: true } }));