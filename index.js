// const mongoose = require('mongoose');
const notecard = require('./models/notecard');

/* mongoose.connect('mongodb://brain:Trainer#2017@ds057806.mlab.com:57806/heroku_b8p1c09m');

var toCreate = {
  id: 46,
  title: 'Toller Titel',
  task: 'Toller Task',
  answer: 'Tolle Answer'
}

*/

/*notecard.createNotecard(toCreate, function(err) {
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
