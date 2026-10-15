import { HttpError } from '../../utils/http-error.js';

const must = (row, id) => {
  if (!row) throw HttpError.notFound(`La tarea ${id} no existe`);
  return row;
};

export function createTasksService(repo) {
  return {
    list: () => repo.findAll(),
    get: async (id) => must(await repo.findById(id), id),
    create: (data) => repo.create(data),
    update: async (id, data) => must(await repo.update(id, data), id),
    remove: async (id) => { must(await repo.remove(id), id); },
  };
}