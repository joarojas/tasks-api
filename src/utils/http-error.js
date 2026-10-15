export class HttpError extends Error {
  constructor(status, message, details) { super(message); this.status = status; this.details = details; }
  static badRequest(m, d) { return new HttpError(400, m, d); }
  static notFound(m) { return new HttpError(404, m); }
  static unauthorized(m = 'No autenticado') { return new HttpError(401, m); }
  static conflict(m) { return new HttpError(409, m); }
}