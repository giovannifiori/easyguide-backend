class ServerError extends Error {
  constructor(message = "An internal error occurred", status = 500) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = "ServerError";
    this.message = message;
    this.status = status;
  }
}

module.exports = ServerError;
