'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _notecard = require('./models/notecard');

var _notecard2 = _interopRequireDefault(_notecard);

var _notecardtype = require('./models/notecardtype');

var _notecardtype2 = _interopRequireDefault(_notecardtype);

var _profile = require('./models/profile');

var _profile2 = _interopRequireDefault(_profile);

var _set = require('./models/set');

var _set2 = _interopRequireDefault(_set);

var _statistic = require('./models/statistic');

var _statistic2 = _interopRequireDefault(_statistic);

var _valuation = require('./models/valuation');

var _valuation2 = _interopRequireDefault(_valuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var connect = function connect(url, callback) {
  _mongoose2.default.connect(url, callback);
};

exports.notecard = _notecard2.default;
exports.notecardtype = _notecardtype2.default;
exports.profile = _profile2.default;
exports.set = _set2.default;
exports.statistic = _statistic2.default;
exports.valuation = _valuation2.default;
exports.connect = connect;