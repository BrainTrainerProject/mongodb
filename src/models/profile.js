import mongoose from 'mongoose';
import mongodb from 'mongodb';
import mapper from './mapper';

const ObjectId = mongodb.ObjectID;

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
  Profile.findOne({ id: ObjectId(id) }, (err, profile) => {
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
  Profile.findOneAndRemove({ _id: ObjectId(id) },
    (err, result) => {
      if (err) return (callback(new Error('Delete Profile', 500), result));
      return result;
    });
};

/*
UPDATE
*/
exports.updateProfile = (id, json, callback) => {
  Profile.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json,
  }, (err, result) => {
    if (err) return (callback(new Error('Update Profile', 400), result));
    return result;
  });
};
