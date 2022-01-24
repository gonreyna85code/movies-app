const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = function (passport) {
  passport.use(
    "login",
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "660766853123-10tfek3hfs64f0t7tpvqmg0l0olhg17v.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL:
          "https://api-eventy.herokuapp.com/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              username: profile.displayName,
              email: profile.email,
              password: "",
            });
            newUser.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
