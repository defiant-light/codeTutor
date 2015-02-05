var express = require('express');
// var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();
var crypto = require('crypto');
var session = require('express-session');

// config file to instantiate 
var User = require('./server/user/userController');
var Users = require('./db/index');
// config file to instantiate all queues
var queues = require('./server/queue/queueCollection.js');
var queueModel = require('./server/queue/queueModel.js');

var passport = require('./server/facebookSignin.js');

var port = process.env.PORT || 3000;
var host = process.env.host || '127.0.0.1';

var util = require('./server/sessionUtils');


app.use(express.static(__dirname));
// app.use(express.cookieParser('shhhh, very secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


app.listen(port);

console.log('Server now listening on port ' + port);

// app.use(partials());


app.set('views', __dirname);

module.exports = app;

app.get('/', function(request, response) {
  response.redirect('./index.html');
});

//when a user clicks his native and desired language and clicks go, send a post request to api/languages
//create a queue for that specific language queue, then 
app.get('/api/getroom', function(request, response) {


  var subject = request.query.subject;
  var level = request.query.level;

  console.log(subject,level);

  var potentialMatches = queues[Queue.stringify(subject,level)];
  console.log(Queue.stringify(subject, level));
  var partnerRoom = null;
  if (potentialMatches.length() > 0) {
    partnerRoom = potentialMatches.shift();
    response.status(200).send(partnerRoom);
  } else {
    console.log('new room');
    var newRoom = crypto.pseudoRandomBytes(256).toString('base64');
    console.log(newRoom);
    queues[Queue.stringify(subject,level)].push(newRoom);
    response.status(200).send(newRoom);
  }
});

app.get('/api/position', function(req, res) {

  var room = req.query.room;
  // for(var i = 0;)

});


app.get('/signin', User.signInUserForm);
app.post('/signin', User.signInUser);

app.get('/logout', User.logoutUser);
app.post('/logout', User.signInUser);

app.get('/#/videochat', function(req, res){
  res.redirect('../../client/signup.html');
});

//Passport facebook auth
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_birthday', 'user_likes'] }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/#/selectSubject',
                                      failureRedirect: '/login' }));

app.get('/*', util.checkUser, function(req, res){
  console.log('testing');
  res.redirect(req.body.url);
})
