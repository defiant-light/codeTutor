var Users = require('../db/index');

// Using passport (http://passportjs.org/guide/facebook/) to authenticate users.

var passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy; 

//serialize and deserialize are used for sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: 632339323578963,
    clientSecret: '3539c1560e204c8c307edf5649177903',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    var profileIdString = profile.id.toString();

    process.nextTick(function () { //used for async (save user to database here?)
      Users.findOne({where: { facebookId: profileIdString }})
      .then(function(user) {
        if (user) {
          done(null, profile);    
        } else {
          Users.create({ 
            username: profile.name.givenName + profile.name.familyName,
            facebookId: profile.id
          });
          done(null, profile);
        }
      });
    });
  }
));

module.exports = passport;
