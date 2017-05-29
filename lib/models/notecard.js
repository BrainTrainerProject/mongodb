'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notecardSchema = _mongoose2.default.Schema({
  title: String,
  task: String,
  answer: String,
  owner: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  type: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Notecardtype' }
});
var Notecard = _mongoose2.default.model('Notecard', notecardSchema);

/*
READ
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Notecard.findById(id, function (err, card) {
    if (!err && card) {
      callback(err, _mapper2.default.convertNotecardToJsonResponse(card));
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ
*/
exports.findAll = function (callback) {
  Notecard.find({}, function (err, cards) {
    var notecardMap = {};
    for (var i = 0; i < cards.length; i += 1) {
      notecardMap[cards[i].id] = _mapper2.default.convertNotecardToJsonResponse(cards[i]);
    }
    callback(err, notecardMap);
  });
};

/*
CREATE
*/
exports.createNotecard = function (json, callback) {
  var newCard = new Notecard({
    id: json.id,
    title: json.title,
    task: json.task,
    answer: json.answer,
    owner: json.owner,
    lastchange: json.lastchange,
    type: json.type
  });
  newCard.save(function (err) {
    callback(err, newCard);
  });
};

/*
DELETE
*/
exports.deleteNotecard = function (id, callback) {
  Notecard.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateNotecard = function (id, json, callback) {
  Notecard.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};