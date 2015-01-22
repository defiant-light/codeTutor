var express = require('express');
// var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;
var host = process.env.host || '127.0.0.1';

app.listen(port);

console.log('Server now listening on port ' + port);

// app.set('views', __dirname + '/views');
// app.use(partials());
// app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));
// app.use(express.cookieParser('shhhh, very secret'));
// app.use(express.session());


module.exports = app;

// app.get('/');
// app.post('/');