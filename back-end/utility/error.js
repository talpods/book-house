export default class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.call(this);
    Error.captureStackTrace(this);
  }
}
