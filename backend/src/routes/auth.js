const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { getMe, logout } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/** GET /auth/google — Redirect to Google OAuth consent screen */
router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify',
  ],
  accessType: 'offline',
  prompt: 'consent', // Always show consent to get refresh token
}));

/** GET /auth/google/callback — Handle OAuth callback with JWT generation */
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id || req.user._id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
      },
      process.env.JWT_SECRET || process.env.SESSION_SECRET || 'secret_jwt_key',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?token=${token}`);
  }
);

/** GET /auth/me — Return current user info from JWT or session */
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.SESSION_SECRET || 'secret_jwt_key');
      return res.json(decoded);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  // Fallback to passport session if present
  if ((req.isAuthenticated && req.isAuthenticated()) || req.user) {
    return res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
  }

  return res.status(401).json({ error: 'No token' });
});

/** POST /auth/logout — Revoke token and clear session */
router.post('/logout', requireAuth, logout);

module.exports = router;
