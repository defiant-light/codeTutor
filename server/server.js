var express = require('express');
// var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();
var crypto = require('crypto');

// config file to instantiate all queues
var queues = require('./queue/queueCollection.js');
var Queue = require('./queue/queueModel.js');

var port = process.env.PORT || 3000;
var host = process.env.host || '127.0.0.1';

app.listen(port);

console.log('Server now listening on port ' + port);

// app.use(partials());
// app.use(bodyParser.json());
app.set('views', __dirname);
app.use(express.static(__dirname));
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

  console.log(nativeLanguage,desiredLanguage);
  var partners = queues[Queue.stringify(desiredLanguage,nativeLanguage)];

  if (partners.length() > 0) {
    var partnerRoom = partners.shift();
    response.status(200).send(partnerRoom);
  } else {
    var newRoom = crypto.pseudoRandomBytes(256).toString('base64');
  	queues[Queue.stringify(nativeLanguage,desiredLanguage)].push(newRoom);
    response.status(200).send(newRoom);
  }
});