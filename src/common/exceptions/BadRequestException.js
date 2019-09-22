class BadRequestException extends Error {
  constructor(message = 'Parameters are missing') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestException';
    this.message = message;
    this.status = 400;
  }
}

module.exports = BadRequestException;
