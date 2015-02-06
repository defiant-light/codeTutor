// Using passport (http://passportjs.org/guide/facebook/) to authenticate users from Facebook.

var Users = require('../db/index');

var passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy; 

var creds = require('../server/facebookCredentials.js');

//serialize and deserialize are used for sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


if(process.env.PORT){
  creds.callbackURL = creds.callbackURLDeployed;
}

//move clientID and secret as to not expose credentials
passport.use(new FacebookStrategy({
    clientID: creds.clientID,
    clientSecret: creds.clientSecret,
    callbackURL: creds.callbackURL,
    passReqToCallback: true 
  },
  function(req, accessToken, refreshToken, profile, done) {
    var profileIdString = profile.id.toString();
    console.log('cat')
    process.nextTick(function () { 
      Users.findOne({where: { facebookId: profileIdString }})
      .then(function(user) {
        if (user) {
          console.log('found in DB');
          done(null, profile);    
        } else {
          console.log(profile);
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
