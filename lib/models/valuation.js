'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValuationSchema = _mongoose2.default.Schema({
  score: Number,
  comment: String,
  profile: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: Date
});

var Valuation = _mongoose2.default.model('Valuation', ValuationSchema);

/*
READ ONE
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Valuation.findById(id, function (err, valuation) {
    if (!err && valuation) {
      callback(err, _mapper2.default.convertValuationToJsonResponse(valuation));
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
  Valuation.find({ profile: id }, function (err, valuations) {
    var valuationMap = {};
    for (var i = 0; i < valuations.length; i += 1) {
      valuationMap[valuations[i].id] = _mapper2.default.convertValuationToJsonResponse(valuations[i]);
    }
    callback(err, valuationMap);
  });
};

/*
READ ALL
*/
exports.findAll = function (callback) {
  Valuation.find({}, function (err, valuations) {
    var valuationMap = {};
    for (var i = 0; i < valuations.length; i += 1) {
      valuationMap[valuations[i].id] = _mapper2.default.convertValuationToJsonResponse(valuations[i]);
    }
    callback(err, valuationMap);
  });
};

/*
CREATE
*/
exports.createValuation = function (json, callback) {
  var newValuation = new Valuation({
    score: json.score,
    comment: json.comment,
    profile: json.profile,
    createdAt: json.createdAt
  });
  newValuation.save(function (err) {
    callback(err, newValuation);
  });
};

/*
DELETE
*/
exports.deleteValuation = function (id, callback) {
  Valuation.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateValuation = function (id, json, callback) {
  Valuation.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};