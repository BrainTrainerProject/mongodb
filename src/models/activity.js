import mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  activityType: String,
  refid: String,
});
const Activity = mongoose.model('Activity', activitySchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Activity.findById(id, (err, activity) => {
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
exports.findByOwner = (id, callback) => {
  Activity.find({ owner: id }, (err, activities) => {
    callback(err, activities);
  });
};

/*
READ Paginate
page: page number from client as request parameter
per_page: number of results shown per page
*/
exports.findByOwner = (id, page, perpage, callback) => {
  Activity.find({ owner: id }).skip((page - 1) * perpage).limit(perpage)
  .exec((err, activities) => {
    callback(err, activities);
  });
};

/*
READ ALL
*/
exports.findAll = (callback) => {
  Activity.find({}, (err, activities) => {
    callback(err, activities);
  });
};

/*
CREATE
*/
exports.createActivity = (json, callback) => {
  const newActivity = new Activity({
    owner: json.owner,
    sender: json.sender,
    activityType: json.activityType,
    refid: json.refid,
  });
  newActivity.save((err) => {
    callback(err, newActivity);
  });
};

exports.createActivities = (array, callback) => {
  Activity.create(array, (err, act) => {
    callback(err, act);
  });
};

/*
DELETE
*/
exports.deleteActivity = (id, callback) => {
  Activity.findByIdAndRemove(id, {}, (err, result) => {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateActivity = (id, json, callback) => {
  Activity.findByIdAndUpdate(id, { $set: json }, { new: true }, (err, result) => {
    callback(err, result);
  });
};
