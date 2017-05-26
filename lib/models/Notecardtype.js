'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongodb2.default.ObjectID;

var notecardTypeSchema = _mongoose2.default.Schema({
  name: String
});

var NotecardType = _mongoose2.default.model('Notecardtype', notecardTypeSchema);

/*
READ ONE
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  NotecardType.findOne({ id: ObjectId(id) }, function (err, type) {
    if (!err && type) {
      callback(err, _mapper2.default.convertNotecardTypeToJsonResponse(type));
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
    var notecardTypeMap = {};
    for (var i = 0; i < types.length; i += 1) {
      notecardTypeMap[types[i].id] = _mapper2.default.convertNotecardTypeToJsonResponse(types[i]);
    }
    callback(err, notecardTypeMap);
  });
};