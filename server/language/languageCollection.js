var Langauge = require('./languageModel.js');

module.exports = ['Chinese','English','French','Italian','Spanish']

// (alphabetical by English name)
// module.exports.languages = languages = {
//   'cn': new Langauge('Chinese', 'cn'),
//   'en': new Langauge('English', 'en'),
//   'fr': new Language('French', 'fr'),
//   'it': new Langauge ('Italian', 'it'),
//   'es': new Language('Spanish', 'es'),
// };

// //Ordered lists of popular foreign languages per native language.
// //Eventually we'd want to show what was popular for speakers of X located in country Y...
// //E.g. English speakers in England much less interested in Spanish than English speakers in America.
// module.exports.popular = {
//   'en': [languages['es'], languages['fr'],languages['cn'],languages['it'],languages['pt']],
// };