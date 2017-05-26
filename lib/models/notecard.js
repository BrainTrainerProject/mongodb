'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongodb2.default.ObjectID;

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
  Notecard.findOne({ id: ObjectId(id) }, function (err, card) {
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
    callback(err);
  });
};

/*
DELETE
*/
exports.deleteNotecard = function (id, callback) {
  Notecard.findOneAndRemove({ _id: ObjectId(id) }, function (err, result) {
    if (err) return callback(new Error('Delete Notecard', 500), result);
    return result;
  });
};

/*
UPDATE
*/
exports.updateNotecard = function (id, title, json, callback) {
  Notecard.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json
  }, function (err, result) {
    if (err) return callback(new Error('Update Notecard', 400), result);
    return result;
  });
};