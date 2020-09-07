const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user-model");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// Authorization

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "Memories",
    },
    (payload, done) => {
      // payload.sub should be a primary key
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        // no error, found user
        if (user) return done(null, user);
        // no error but no user found with that _id
        else return done(null, false);
      });
    }
  )
);

// Authenticated local Strategy using username & pwd

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // something went wrong with database
      if (err) return done(err);
      // if no user exist
      if (!user) return done(null, false);
      // check if password is correct
      user.comparePassword(password, done);   //defined in User model
    });
  })
);

// authenticated local strategy using username and password
