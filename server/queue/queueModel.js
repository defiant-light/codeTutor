module.exports = Queue = function(subject, level) {

  this.subject = subject;
  this.level = level;
  this.storage = [];
};

Queue.stringify = function(subject, level) {
  return JSON.stringify([subject, level ]);
};

Queue.prototype.stringify = function() {
  return Queue.stringify(this.subject, this.level);
};

Queue.prototype.length = function() {
  return this.storage.length;
};

Queue.prototype.push = function (item){
  return this.storage.push(item);
};

Queue.prototype.shift = function() {
  return this.storage.shift();
};