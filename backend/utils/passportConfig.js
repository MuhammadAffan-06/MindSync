const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      //  callbackURL: `${process.env.SERVER_DOMAIN}:${process.env.PORT}/auth/google/callback`,
      callbackURL:
        "https://mindsync-hpauf7bfegd9dudz.westindia-01.azurewebsites.net/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Generate JWT token for the existing user
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              name: user.name,
              picture: user.picture,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
          return done(null, user, { token });
        }

        // If user does not exist, create a new user
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
        });

        // Generate JWT token for the new user
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
            picture: user.picture,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, user, { token });
      } catch (err) {
        console.error(err);
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
