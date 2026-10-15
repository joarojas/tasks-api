import { Router } from 'express';
import { supabase } from '../../lib/supabase.js';

export const healthRouter = Router();
healthRouter.get('/', (_req, res) => res.json({ status: 'ok' }));
healthRouter.get('/db', async (_req, res) => {
  const { error } = await supabase.from('tasks').select('id').limit(1);
  if (error) return res.status(503).json({ message: 'BD no disponible', details: error.message });
  res.json({ status: 'ok', db: 'up' });
});