import { unwrap } from '../../lib/supabase.js';

export function createUsersRepository(db) {
  return {
    async findByEmail(email) { return unwrap(await db.from('users').select('*').eq('email', email).maybeSingle()); },
    async create(d) { return unwrap(await db.from('users').insert(d).select('id,email,created_at').single()); },
  };
}