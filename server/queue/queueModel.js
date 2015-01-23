module.exports = function(native, foreign) {

  this.languages = {};
  this.languages.native = native;
  this.languages.foreign = foreign;
  this.storage = [];

};

module.exports.stringify = function(nativeLanguage,desiredLanguage) {
  return JSON.stringify([nativeLanguage,desiredLanguage]);
};