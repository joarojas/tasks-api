import { Router } from 'express';
import { supabase } from '../../lib/supabase.js';
import { validate } from '../../middlewares/validate.js';
import { createTasksRepository } from './tasks.repository.js';
import { createTasksService } from './tasks.service.js';
import { createTasksController } from './tasks.controller.js';
import { idParamSchema, createTaskSchema, updateTaskSchema } from './tasks.schema.js';

const c = createTasksController(createTasksService(createTasksRepository(supabase)));
const id = validate(idParamSchema, 'params');

export const tasksRouter = Router();
tasksRouter.get('/', c.list);
tasksRouter.get('/:id', id, c.get);
tasksRouter.post('/', validate(createTaskSchema), c.create);
tasksRouter.patch('/:id', id, validate(updateTaskSchema), c.update);
tasksRouter.delete('/:id', id, c.remove);