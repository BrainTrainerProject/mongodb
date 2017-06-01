import mongoose from 'mongoose';
import mapper from './mapper';

const profileSchema = mongoose.Schema({
  email: String,
  oauthtoken: String,
  photourl: String,
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  visibility: Boolean,
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
});

const Profile = mongoose.model('Profile', profileSchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Profile.findById(id, (err, profile) => {
    if (!err && profile) {
      callback(err, mapper.convertProfileToJsonResponse(profile));
    } else {
      callback(err, null);
    }
  });
  return null;
};

exports.findByOauthtoken = (oauthtoken, callback) => {
  Profile.findOne({ oauthtoken }, (err, profile) => {
    if (!err && profile) {
      callback(err, mapper.convertProfileToJsonResponse(profile));
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ ALL
*/
exports.findAll = (callback) => {
  Profile.find({}, (err, profiles) => {
    const profileMap = {};
    for (let i = 0; i < profiles.length; i += 1) {
      profileMap[profiles[i].id] = mapper.convertProfileToJsonResponse(profiles[i]);
    }
    callback(err, profileMap);
  });
};

/*
CREATE
*/
exports.createProfile = (json, callback) => {
  const newProfile = new Profile({
    email: json.email,
    oauthtoken: json.oauthtoken,
    photourl: json.photourl,
    follower: json.follower,
    visibility: json.visibility,
    sets: json.sets,
  });
  newProfile.save((err) => {
    callback(err, newProfile);
  });
};

/*
DELETE
*/
exports.deleteProfile = (id, callback) => {
  Profile.findByIdAndRemove(id, {}, (err, result) => {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateProfile = (id, json, callback) => {
  Profile.findByIdAndUpdate(id, { $set: json }, { new: true }, (err, result) => {
    callback(err, result);
  });
};
