/**
 * Typed error with an HTTP status code. Use this anywhere in controllers/services
 * to short-circuit a request with a clean JSON error response.
 *
 *   throw new ApiError(404, "User not found");
 */
class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

module.exports = ApiError;
