// User controller to sign in/up, log in/out users. Use bcrypt to hash/salt

var Users = require('../../db/index');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');


exports.signInUser = function(req, res) {
  console.log('working!');


  res.json({token:'signin token'});

};




