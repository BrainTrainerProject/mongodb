'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SetSchema = _mongoose2.default.Schema({
  notecard: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Notecard' }],
  tags: [{ type: String }],
  valuations: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Valuation' }],
  owner: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  visibility: Boolean,
  photourl: String,
  title: String,
  description: String
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
  Set.findById(id, function (err, set) {
    if (!err && set) {
      callback(err, set);
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ ALL By Owner
*/
exports.findByOwner = function (id, callback) {
  Set.find({ owner: id }, function (err, sets) {
    var setMap = {};
    for (var i = 0; i < sets.length; i += 1) {
      setMap[sets[i].id] = sets[i];
    }
    callback(err, setMap);
  });
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Set.find({}, function (err, sets) {
    var setMap = {};
    for (var i = 0; i < sets.length; i += 1) {
      setMap[sets[i].id] = sets[i];
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
    photourl: json.photourl,
    title: json.title,
    description: json.description
  });
  newSet.save(function (err) {
    callback(err, newSet);
  });
};

/*
DELETE
*/
exports.deleteSet = function (id, callback) {
  Set.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateSet = function (id, json, callback) {
  Set.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};