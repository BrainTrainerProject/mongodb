'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var profileSchema = _mongoose2.default.Schema({
  email: String,
  oauthtoken: String,
  photourl: String,
  visibility: Boolean,
  cardsPerSession: Number,
  interval: Number,
  follower: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Profile' }],
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
  Profile.findById(id, function (err, profile) {
    if (!err && profile) {
      callback(err, profile);
    } else {
      callback(err, null);
    }
  });
  return null;
};

exports.findByOauthtoken = function (oauthtoken, callback) {
  Profile.findOne({ oauthtoken: oauthtoken }, function (err, profile) {
    if (!err && profile) {
      callback(err, profile);
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
      profileMap[profiles[i].id] = profiles[i];
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
    visibility: json.visibility,
    cardsPerSession: json.cardsPerSession,
    interval: json.interval,
    follower: json.follower,
    sets: json.sets
  });
  newProfile.save(function (err) {
    callback(err, newProfile);
  });
};

/*
DELETE
*/
exports.deleteProfile = function (id, callback) {
  Profile.findByIdAndRemove(id, {}, function (err, result) {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateProfile = function (id, json, callback) {
  Profile.findByIdAndUpdate(id, { $set: json }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.addFollower = function (id, followerlist, callback) {
  Profile.findByIdAndUpdate(id, { $push: { follower: { $each: followerlist } } }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.removeFollower = function (id, followerlist, callback) {
  Profile.findByIdAndUpdate(id, { $pullAll: { follower: followerlist } }, function (err, result) {
    callback(err, result);
  });
};

exports.addSets = function (id, setslist, callback) {
  Profile.findByIdAndUpdate(id, { $push: { sets: { $each: setslist } } }, { new: true }, function (err, result) {
    callback(err, result);
  });
};

exports.removeSets = function (id, setslist, callback) {
  Profile.findByIdAndUpdate(id, { $pullAll: { sets: setslist } }, function (err, result) {
    callback(err, result);
  });
};