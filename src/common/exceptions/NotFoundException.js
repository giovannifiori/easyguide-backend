class NotFoundException extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotFoundException';
    this.message = 'The requested resource was not found!';
    this.status = 404;
  }
}

module.exports = NotFoundException;
