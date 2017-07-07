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
    callback(err, sets);
  });
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Set.find({}, function (err, sets) {
    callback(err, sets);
  });
};

exports.search = function (searchParam, orderByDate, sortAsc, callback) {
  var findParam = { $and: [{ $or: [{ tags: { $in: searchParam } }, { title: { $in: searchParam } }] }, { visibility: true }] };
  if (orderByDate) {
    var sortP = void 0;
    if (sortAsc) {
      sortP = { lastchange: 'ascending' };
    } else {
      sortP = { lastchange: 'descending' };
    }
    Set.find(findParam).sort(sortP).exec(callback);
  } else {
    Set.find(findParam, function (err, sets) {
      callback(err, sets);
    });
  }
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

exports.addNotecards = function (id, notecardlist, callback) {
  Set.findByIdAndUpdate(id, { $push: { notecard: { $each: notecardlist } } }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.removeNotecards = function (id, notecardlist, callback) {
  Set.findByIdAndUpdate(id, { $pullAll: { notecard: notecardlist } }, function (err, result) {
    callback(err, result);
  });
};

exports.addTags = function (id, taglist, callback) {
  Set.findByIdAndUpdate(id, { $push: { tags: { $each: taglist } } }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.removeTags = function (id, taglist, callback) {
  Set.findByIdAndUpdate(id, { $pullAll: { tags: taglist } }, function (err, result) {
    callback(err, result);
  });
};

exports.addValuations = function (id, valuationlist, callback) {
  Set.findByIdAndUpdate(id, { $push: { valuations: { $each: valuationlist } } }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.removeValuations = function (id, valuationlist, callback) {
  Set.findByIdAndUpdate(id, { $pullAll: { valuations: valuationlist } }, function (err, result) {
    callback(err, result);
  });
};