//we probably want languages in the DB. but... mvp.
module.exports = Language = function(name, abbr) {
  this.name = name;
  this.abbr = abbr;
};