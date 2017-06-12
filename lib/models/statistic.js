'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      callback(err, _mapper2.default.convertStatisticToJsonResponse(statistic));
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
    var statisticMap = {};
    for (var i = 0; i < statistics.length; i += 1) {
      statisticMap[statistics[i].id] = _mapper2.default.convertStatisticToJsonResponse(statistics[i]);
    }
    callback(err, statisticMap);
  });
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Statistic.find({}, function (err, statistics) {
    var statisticMap = {};
    for (var i = 0; i < statistics.length; i += 1) {
      statisticMap[statistics[i].id] = _mapper2.default.convertStatisticToJsonResponse(statistics[i]);
    }
    callback(err, statisticMap);
  });
};

/*
CREATE
*/
exports.createStatistic = function (json, callback) {
  var newStatistic = new Statistic({
    profile: json.profile,
    notecard: json.notecard,
    successfultries: json.successfultries,
    totaltries: json.totaltries
  });
  newStatistic.save(function (err) {
    callback(err, newStatistic);
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
  Statistic.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};