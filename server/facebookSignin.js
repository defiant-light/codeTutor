// Using passport (http://passportjs.org/guide/facebook/) to authenticate users from Facebook.

var Users = require('../db/index');

var passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy; 

//serialize and deserialize are used for sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//move clientID and secret as to not expose credentials
passport.use(new FacebookStrategy({
    clientID: 1545918208991310,
    clientSecret: '96563b6dd3550f03538db3b12621e8b5',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    var profileIdString = profile.id.toString();

    process.nextTick(function () { 
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
