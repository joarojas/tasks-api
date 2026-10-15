export function createTasksController(s) {
  return {
    list: async (_req, res) => res.json(await s.list()),
    get: async (req, res) => res.json(await s.get(req.params.id)),
    create: async (req, res) => res.status(201).json(await s.create(req.body)),
    update: async (req, res) => res.json(await s.update(req.params.id, req.body)),
    remove: async (req, res) => { await s.remove(req.params.id); res.status(204).end(); },
  };
}