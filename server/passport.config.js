require("dotenv").config();

const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const User = require("./models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const { email } = payload;
      const user = await User.findOne({ email });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);

module.exports = passport;
