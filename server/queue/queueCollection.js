//create a queue for every language combination
var subjects = require('../subject/subjectCollection');

var Queue = require('./queueModel');

module.exports = queues = {};

for (var i = 0; i < subjects.length; i++) {
  for (var j = 1; j <= 10; j++) {
  	var queue = new Queue(subjects[i], ""+j);

    queues[queue.stringify()] = queue;
  }
}




