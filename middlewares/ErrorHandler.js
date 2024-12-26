//middlewares/errorMiddlewares.js
const { StandardResponse } = require("../dto/StandardResponse");
const { NotFoundError } = require("../types/error/NotFoundError");

/**
 * Error handler middleware
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof NotFoundError) {
    statusCode = err.statusCode || 404;
    message = err.message;
  }

  const response = {
    statusCode: statusCode,
    msg: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  return res.status(statusCode).send(response);
};

module.exports = errorHandler;

