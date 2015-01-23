//create a queue for every language combination

var languages = require('../language/languageCollection');
var Queue = require('./queueModel');

module.exports = queues = {};

for (var i = 0; i < languages.length; i++) {
  for (var j = 0; j < languages.length; j++) {
  	var queue = new Queue(languages[i], languages[j]);

    queues[queue.stringify()] = queue;
  }
}

