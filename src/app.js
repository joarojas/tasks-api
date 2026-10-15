import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from './routes.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

export function createApp() {
  const app = express();
  app.use(express.json(), cors(), morgan('dev'));
  app.use('/api', apiRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}