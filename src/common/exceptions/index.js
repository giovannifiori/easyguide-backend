const ServerError = require('./ServerError');
const HttpStatusCodes = require('../util/HttpStatusCodes');

class BadRequestException extends ServerError {
  constructor(message = 'Parameters are missing') {
    super(message, HttpStatusCodes.BAD_REQUEST);
    this.name = 'BadRequestException';
  }
}

class NotAuthorizedException extends ServerError {
  constructor(message = "You're not allowed to perform this action") {
    super(message, HttpStatusCodes.NOT_AUTHORIZED);
    this.name = 'NotAuthorizedException';
  }
}

class NotFoundException extends ServerError {
  constructor(message = 'The requested resource was not found') {
    super(message, HttpStatusCodes.NOT_FOUND);
    this.name = 'NotFoundException';
  }
}

const exceptionHandler = (e, res) => {
  if (e instanceof ServerError) {
    return res.status(e.status).json(e);
  }
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json(new ServerError(e.message, HttpStatusCodes.INTERNAL_SERVER_ERROR));
};

module.exports = {
  BadRequestException,
  NotAuthorizedException,
  NotFoundException,
  ServerError,
  exceptionHandler
};
