import { unwrap } from '../../lib/supabase.js';
const T = 'tasks';

export function createTasksRepository(db) {
  return {
    async findAll() { return unwrap(await db.from(T).select('*').order('id')); },
    async findById(id) { return unwrap(await db.from(T).select('*').eq('id', id).maybeSingle()); },
    async create(d) { return unwrap(await db.from(T).insert(d).select().single()); },
    async update(id, d) { return unwrap(await db.from(T).update(d).eq('id', id).select().maybeSingle()); },
    async remove(id) { return unwrap(await db.from(T).delete().eq('id', id).select().maybeSingle()); },
  };
}