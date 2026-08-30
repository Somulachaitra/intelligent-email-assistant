const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Auth middleware — protects all /api/ routes.
 * Supports both JWT Bearer tokens and session authentication.
 */
const requireAuth = async (req, res, next) => {
  // 1. Check for JWT in Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.SESSION_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        return next();
      }
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token.' });
    }
  }

  // 2. Fallback to session / passport
  if ((req.isAuthenticated && req.isAuthenticated()) || req.user) {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized',
    message: 'You must be logged in to access this resource.',
  });
};

module.exports = { requireAuth };
