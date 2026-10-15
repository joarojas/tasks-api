export function createAuthController(s) {
  return {
    register: async (req, res) => res.status(201).json(await s.register(req.body)),
    login: async (req, res) => res.json(await s.login(req.body)),
  };
}