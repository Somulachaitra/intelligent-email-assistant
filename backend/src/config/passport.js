const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');
const { encrypt } = require('./encryption');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const picture = profile.photos?.[0]?.value;

        // Encrypt tokens before storing
        const encryptedAccessToken = encrypt(accessToken);
        const encryptedRefreshToken = refreshToken ? encrypt(refreshToken) : undefined;

        const user = await User.upsert({
          googleId: profile.id,
          email,
          name: profile.displayName,
          picture,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
        });

        return done(null, user);
      } catch (error) {
        console.error('Passport Google Strategy error:', error);
        return done(error, null);
      }
    }
  )
);

// Serialize: store only the user's MongoDB _id in the session
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// Deserialize: retrieve full user from DB on each request
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
