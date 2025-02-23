export class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors ?? [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};