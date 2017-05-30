'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _mapper = require('./mapper');

var _mapper2 = _interopRequireDefault(_mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongodb2.default.ObjectID;

var profileSchema = _mongoose2.default.Schema({
  email: String,
  oauthtoken: String,
  photourl: String,
  follower: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' }],
  visibility: Boolean,
  sets: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Set' }]
});

var Profile = _mongoose2.default.model('Profile', profileSchema);

/*
READ ONE
*/
exports.findById = function (id, callback) {
  var isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Profile.findOne({ id: ObjectId(id) }, function (err, profile) {
    if (!err && profile) {
      callback(err, _mapper2.default.convertProfileToJsonResponse(profile));
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
  Profile.find({}, function (err, profiles) {
    var profileMap = {};
    for (var i = 0; i < profiles.length; i += 1) {
      profileMap[profiles[i].id] = _mapper2.default.convertProfileToJsonResponse(profiles[i]);
    }
    callback(err, profileMap);
  });
};

/*
CREATE
*/
exports.createProfile = function (json, callback) {
  var newProfile = new Profile({
    email: json.email,
    oauthtoken: json.oauthtoken,
    photourl: json.photourl,
    follower: json.follower,
    visibility: json.visibility,
    sets: json.sets
  });
  newProfile.save(function (err) {
    callback(err);
  });
};

/*
DELETE
*/
exports.deleteProfile = function (id, callback) {
  Profile.findOneAndRemove({ _id: ObjectId(id) }, function (err, result) {
    if (err) return callback(new Error('Delete Profile', 500), result);
    return result;
  });
};

/*
UPDATE
*/
exports.updateProfile = function (id, json, callback) {
  Profile.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json
  }, function (err, result) {
    if (err) return callback(new Error('Update Profile', 400), result);
    return result;
  });
};