/**
 * Centralized error handling middleware.
 * Must have 4 parameters (err, req, res, next) for Express to treat it as error handler.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: 'Validation Error', details: errors });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    return res.status(409).json({
      error: 'Conflict',
      message: `A record with this ${field} already exists.`,
    });
  }

  // Mongoose cast error (invalid ObjectId etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID', message: err.message });
  }

  // Google API errors
  if (err.code && err.errors) {
    return res.status(err.code || 500).json({
      error: 'Gmail API Error',
      message: err.message,
    });
  }

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : message,
    message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong.',
  });
};

module.exports = errorHandler;
