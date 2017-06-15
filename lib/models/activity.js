'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activitySchema = _mongoose2.default.Schema({
  owner: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  sender: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  activityType: String
});
var Activity = _mongoose2.default.model('Activity', activitySchema);

/*
READ ONE
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Activity.findById(id, function (err, activity) {
    if (!err && activity) {
      callback(err, activity);
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
  Activity.find({ owner: id }, function (err, activities) {
    var activityMap = {};
    for (var i = 0; i < activities.length; i += 1) {
      activityMap[activities[i].id] = activities[i];
    }
    callback(err, activityMap);
  });
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Activity.find({}, function (err, activities) {
    var activityMap = {};
    for (var i = 0; i < activities.length; i += 1) {
      activityMap[activities[i].id] = activities[i];
    }
    callback(err, activityMap);
  });
};

/*
CREATE
*/
exports.createActivity = function (json, callback) {
  var newActivity = new Activity({
    owner: json.owner,
    sender: json.sender,
    activityType: json.activityType
  });
  newActivity.save(function (err) {
    callback(err, newActivity);
  });
};

/*
DELETE
*/
exports.deleteActivity = function (id, callback) {
  Activity.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateActivity = function (id, json, callback) {
  Activity.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};