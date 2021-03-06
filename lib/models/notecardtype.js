'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notecardTypeSchema = _mongoose2.default.Schema({
  name: String
});

var NotecardType = _mongoose2.default.model('Notecardtype', notecardTypeSchema);

/*
READ ONE
Kommentar
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  NotecardType.findById(id, function (err, type) {
    if (!err && type) {
      callback(err, type);
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
  NotecardType.find({}, function (err, types) {
    callback(err, types);
  });
};

/*
CREATE
*/
exports.createNotecardType = function (json, callback) {
  var newCardType = new NotecardType({
    name: json.name
  });
  newCardType.save(function (err) {
    callback(err, newCardType);
  });
};

/*
DELETE
*/
exports.deleteNotecardType = function (id, callback) {
  NotecardType.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateNotecardType = function (id, json, callback) {
  NotecardType.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};