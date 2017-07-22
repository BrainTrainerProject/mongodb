import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  email: String,
  oauthtoken: String,
  photourl: String,
  visibility: Boolean,
  cardsPerSession: Number,
  interval: Number,
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
  firebasetoken: String,
  name: String,
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
      callback(err, profile);
    } else {
      callback(err, null);
    }
  });
  return null;
};

exports.findByIds = function (ids, callback) {
  Profile.find({ _id: { $in: ids.map(o => mongoose.Types.ObjectId(o)) } }, (err, vals) => {
    callback(err, vals);
  });
};

exports.findByOauthtoken = (oauthtoken, callback) => {
  Profile.findOne({ oauthtoken }, (err, profile) => {
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
exports.findAll = (callback) => {
  Profile.find({}, (err, profiles) => {
    callback(err, profiles);
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
    visibility: json.visibility,
    cardsPerSession: json.cardsPerSession,
    interval: json.interval,
    follower: json.follower,
    sets: json.sets,
    firebasetoken: json.firebasetoken,
    name: json.name,
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

exports.addFollower = (id, followerlist, callback) => {
  Profile.findByIdAndUpdate(id, { $push: { follower: { $each: followerlist } } },
   { new: true }, (err, result) => {
     callback(err, result);
   });
};

exports.removeFollower = (id, followerlist, callback) => {
  Profile.findByIdAndUpdate(id, { $pullAll: { follower: followerlist } },
   (err, result) => {
     callback(err, result);
   });
};

exports.addSets = (id, setslist, callback) => {
  Profile.findByIdAndUpdate(id, { $push: { sets: { $each: setslist } } },
   { new: true }, (err, result) => {
     callback(err, result);
   });
};

exports.removeSets = (id, setslist, callback) => {
  Profile.findByIdAndUpdate(id, { $pullAll: { sets: setslist } },
   (err, result) => {
     callback(err, result);
   });
};
