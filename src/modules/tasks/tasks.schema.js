import { z } from 'zod';

const base = z.object({
  title: z.string().trim().min(1).max(200).meta({ example: 'Preparar la demo' }),
  done: z.boolean().meta({ example: false }),
});
export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });
export const createTaskSchema = base.extend({ done: base.shape.done.default(false) });
export const updateTaskSchema = base.partial().refine((o) => Object.keys(o).length > 0, 'Envíe al menos un campo');
export const taskSchema = z.object({
  id: z.number().meta({ example: 1 }),
  title: z.string(),
  done: z.boolean(),
  created_at: z.string().meta({ format: 'date-time' }),
});