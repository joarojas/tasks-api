import { Router } from 'express';
import { supabase } from '../../lib/supabase.js';
import { validate } from '../../middlewares/validate.js';
import { createUsersRepository } from './users.repository.js';
import { createAuthService } from './auth.service.js';
import { createAuthController } from './auth.controller.js';
import { credentialsSchema } from './auth.schema.js';

const c = createAuthController(createAuthService(createUsersRepository(supabase)));

export const authRouter = Router();
authRouter.post('/register', validate(credentialsSchema), c.register);
authRouter.post('/login', validate(credentialsSchema), c.login);