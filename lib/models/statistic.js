'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var json2mongo = require('json2mongo');

var StatisticSchema = _mongoose2.default.Schema({
  profile: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  notecard: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Notecard' },
  successfultries: Number,
  totaltries: Number
});

var Statistic = _mongoose2.default.model('Statistic', StatisticSchema);

/*
READ ONE
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Statistic.findById(id, function (err, statistic) {
    if (!err && statistic) {
      callback(err, statistic);
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ ALL by Owner
*/
exports.findByOwner = function (id, callback) {
  Statistic.find({ profile: id }, function (err, statistics) {
    callback(err, statistics);
  });
};

exports.findByNotecardsAndOwner = function (notecards, id, callback) {
  Statistic.find({ $and: [{ notecard: { $in: notecards } }, { profile: id }] }, function (err, statistics) {
    callback(err, statistics);
  });
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Statistic.find({}, function (err, statistics) {
    callback(err, statistics);
  });
};

/*
CREATE
@TODO: createStatisticMultiple ueberfluessig
*/
exports.createStatistic = function (json, callback) {
  Statistic.collection.insert(json2mongo(json), function (err, newStatistic) {
    callback(err, newStatistic);
  });
};

exports.createStatisticMultiple = function (statistics, callback) {
  Statistic.collection.insert(json2mongo(statistics), function (err, result) {
    callback(err, result);
  });
};

/*
DELETE
*/
exports.deleteStatistic = function (id, callback) {
  Statistic.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateStatistic = function (id, json, callback) {
  var mongo = json2mongo(json);
  Statistic.findByIdAndUpdate(id, { $set: mongo }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.updateStatisticMultiple = function (statistics, callback) {
  console.log('start update multiple');
  for (var i = 0; i < statistics.length; i += 1) {
    Statistic.findByIdAndUpdate(statistics[i].id, { $set: {
        profile: statistics[i].profile,
        notecard: statistics[i].notecard,
        successfultries: statistics[i].successfultries,
        totaltries: statistics[i].totaltries
      } }, { new: true }, function (err, result) {
      callback(err, result);
    });
  }
  console.log('ende update multiple');
};