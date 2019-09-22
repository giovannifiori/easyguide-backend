class NotAuthorizedException extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = "NotAuthorizedException";
    this.message = "You're not allowed to perform this action";
    this.status = 401;
  }
}

module.exports = NotAuthorizedException;
