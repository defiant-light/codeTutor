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
    clientID: 750262331736676,
    clientSecret: 'c0b054477dc3ce8979ef818c52f62255',
    // callbackURL: "http://localhost:3000/auth/facebook/callback",
    callbackURL: "http://localhost:3000/",

    passReqToCallback: true 
  },
  function(req, accessToken, refreshToken, profile, done) {
    var profileIdString = profile.id.toString();
    console.log('cat')
    process.nextTick(function () { 
      Users.findOne({where: { facebookId: profileIdString }})
      .then(function(user) {
        if (user) {
          done(null, profile);    
        } else {
          Users.create({ 
            username: profile.name.givenName + profile.name.familyName,
            facebookId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName
          });
          done(null, profile);
        }
      });
    });
  }
));

module.exports = passport;
