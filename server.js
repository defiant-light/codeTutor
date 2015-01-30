var express = require('express');
// var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();
var crypto = require('crypto');
var User = require('./db/index');
// config file to instantiate all queues
var queues = require('./server/queue/queueCollection.js');
var queueModel = require('./server/queue/queueModel.js');

var port = process.env.PORT || 3000;
var host = process.env.host || '127.0.0.1';

app.listen(port);

console.log('Server now listening on port ' + port);

// app.use(partials());
app.use(bodyParser.json());
app.set('views', __dirname);
app.use(express.static(__dirname));
console.log(__dirname);
// app.use(express.cookieParser('shhhh, very secret'));
// app.use(express.session());

module.exports = app;

app.get('/', function(request, response) {
  response.redirect('./index.html');
});

//when a user clicks his native and desired language and clicks go, send a post request to api/languages
//create a queue for that specific language queue, then 
app.get('/api/getroom', function(request, response) {


  var nativeLanguage = request.query.native;
  var desiredLanguage = request.query.desired;
  var requireNative = (request.query.requireNative === "true");

  console.log(nativeLanguage,desiredLanguage);

  var nonNativePartners = queues[Queue.stringify(nativeLanguage,desiredLanguage)];
  var nativePartners = queues[Queue.stringify(desiredLanguage,nativeLanguage)];
  var partnerRoom = null;
  if (!requireNative && nonNativePartners.length() > 0) {
    partnerRoom = nonNativePartners.shift();
    response.status(200).send(partnerRoom);
  } else if (nativePartners.length() > 0) {
    partnerRoom = nativePartners.shift();
    response.status(200).send(partnerRoom);
  } else {
    console.log('new room');
    var newRoom = crypto.pseudoRandomBytes(256).toString('base64');
    console.log(newRoom);
    queues[Queue.stringify(nativeLanguage,desiredLanguage)].push(newRoom);
    response.status(200).send(newRoom);
  }
});

app.get('/signup', function(request, response) {
  response.redirect('./client/signup.html');
});

app.post('/signup', function(req, res) {
  console.log('post request confirmed');
  // var username=req.body.username;
  console.log(req.body);
  // var password=req.body.password;

  // User.findOne({ where : { 
  //   username: username }
  // })
  //   .complete(function(err, user) {
  //     console.log(user);
  //     if (user) {
  //       // User.create()
  //       console.log("pick a new username");
  //     }
  //     if (err) {
  //       User
  //         .create({
  //           username: username,
  //           firstname: req.body.firstname,
  //           lastname: req.body.lastname,
  //           password: password,
  //           // desired: 'english'
  //         })
  //         .complete(function(err, user) {
  //           if (!!err) {
  //             console.log('An error occurred while creating the table: user.create', err);
  //           } else {
  //             console.log('User created: ', user);
  //             res.render('/index.html');
  //           }
  //         });
  //     }
  //   });
});