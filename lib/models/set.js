'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongodb2.default.ObjectID;

var SetSchema = _mongoose2.default.Schema({
  notecard: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Notecard' }],
  tags: [{ type: String }],
  valuations: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Valuation' }],
  owner: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  visibility: Boolean,
  photourl: String
});

var Set = _mongoose2.default.model('Set', SetSchema);

/*
READ ONE
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Set.findOne({ id: ObjectId(id) }, function (err, set) {
    if (!err && set) {
      callback(err, _mapper2.default.convertSetToJsonResponse(set));
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Set.find({}, function (err, sets) {
    var setMap = {};
    for (var i = 0; i < sets.length; i += 1) {
      setMap[sets[i].id] = _mapper2.default.convertSetToJsonResponse(sets[i]);
    }
    callback(err, setMap);
  });
};

/*
CREATE
*/
exports.createSet = function (json, callback) {
  var newSet = new Set({
    notecard: json.notecard,
    tags: json.tags,
    valuations: json.valuations,
    owner: json.owner,
    lastchange: json.lastchange,
    visibility: json.visibility,
    photourl: json.photourl
  });
  newSet.save(function (err) {
    callback(err, newSet);
  });
};

/*
DELETE
*/
exports.deleteSet = function (id, callback) {
  Set.findOneAndRemove({ _id: ObjectId(id) }, function (err, result) {
    if (err) return callback(new Error('Delete Set', 500), result);
    return result;
  });
};

/*
UPDATE
*/
exports.updateSet = function (id, json, callback) {
  Set.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json
  }, function (err, result) {
    if (err) return callback(new Error('Update Set', 400), result);
    return result;
  });
};