// const mongoose = require('mongoose');
const notecard = require('./models/notecard');
const notecardtype = require('./models/notecardtype');
const profile = require('./models/profile');
const set = require('./models/set');
const statistic = require('./models/statistic');
const valuation = require('./models/valuation');

/* mongoose.connect('mongodb://brain:Trainer#2017@ds057806.mlab.com:57806/heroku_b8p1c09m');

var toCreate = {
  id: 46,
  title: 'Toller Titel',
  task: 'Toller Task',
  answer: 'Tolle Answer'
}

*/

/* notecard.createNotecard(toCreate, function(err) {
  console.log(err);
});
console.log('After create');
*/


/* notecard.findAll(function(err, map) {
  console.log(err);
  console.log(map);
})
console.log('After findAll');
*/

exports.notecard = notecard;
exports.notecardtype = notecardtype;
exports.profile = profile;
exports.set = set;
exports.statistic = statistic;
exports.valuation = valuation;
