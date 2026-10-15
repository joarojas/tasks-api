import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(3000),
  SUPABASE_URL: z.url(),
  SUPABASE_SECRET_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(32, 'Debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Configuración inválida:', z.prettifyError(parsed.error));
  process.exit(1);
}
export const env = parsed.data;