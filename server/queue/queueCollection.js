//create a queue for every language combination

var languages = require('../language/languageCollection');
var Queue = require('./queueModel');

var queues = {};

for (var i = 0; i < languages.length; i++) {
  for (var j = 0; j < languages.length; j++) {
    queues[JSON.stringify([ languages[i],languages[j] ])] = new Queue(languages[i], languages[j]);
  }
}