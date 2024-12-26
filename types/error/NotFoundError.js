class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this._statusCode = 404;
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(value) {
    this._statusCode = value;
  }
}

module.exports = NotFoundError;
