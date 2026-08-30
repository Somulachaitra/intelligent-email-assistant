const { google } = require('googleapis');
const { decrypt } = require('../config/encryption');

/**
 * GET /auth/me — returns the current logged-in user's public info
 */
const getMe = (req, res) => {
  if ((req.isAuthenticated && req.isAuthenticated()) || req.user) {
    const userObj = req.user?.toPublicJSON ? req.user.toPublicJSON() : req.user;
    return res.json(userObj);
  }
  return res.status(401).json({ error: 'Not authenticated' });
};

/**
 * POST /auth/logout — revoke Google token, destroy session
 */
const logout = async (req, res, next) => {
  try {
    // Revoke the Google access token
    if (req.user && req.user.accessToken) {
      try {
        const accessToken = decrypt(req.user.accessToken);
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2Client.setCredentials({ access_token: accessToken });
        await oauth2Client.revokeCredentials();
      } catch (revokeError) {
        // Non-fatal — proceed with session destroy even if revocation fails
        console.warn('Token revocation failed (may already be invalid):', revokeError.message);
      }
    }

    // Destroy the session
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          console.warn('Session destruction error:', sessionErr.message);
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMe, logout };
