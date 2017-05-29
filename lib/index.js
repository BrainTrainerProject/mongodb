'use strict';

// const mongoose = require('mongoose');
var notecard = require('./models/notecard');
var notecardtype = require('./models/notecardtype');
var profile = require('./models/profile');
var set = require('./models/set');
var statistic = require('./models/statistic');
var valuation = require('./models/valuation');

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