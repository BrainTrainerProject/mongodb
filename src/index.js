import mongoose from 'mongoose';
import notecard from './models/notecard';
import notecardtype from './models/notecardtype';
import profile from './models/profile';
import set from './models/set';
import statistic from './models/statistic';
import valuation from './models/valuation';
import activity from './models/activity';

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

const connect = (url, callback) => {
  mongoose.connect(url, callback);
};

const disconnect = () => {
  mongoose.disconnect();
};

exports.notecard = notecard;
exports.notecardtype = notecardtype;
exports.profile = profile;
exports.set = set;
exports.statistic = statistic;
exports.valuation = valuation;
exports.activity = activity;
exports.connect = connect;
exports.disconnect = disconnect;
exports.connection = mongoose.connection;
