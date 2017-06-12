import mongoose from 'mongoose';

const notecardTypeSchema = mongoose.Schema({
  name: String,
});

const NotecardType = mongoose.model('Notecardtype', notecardTypeSchema);

/*
READ ONE
Kommentar
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  NotecardType.findById(id, (err, type) => {
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
exports.findAll = (callback) => {
  NotecardType.find({}, (err, types) => {
    const notecardTypeMap = {};
    for (let i = 0; i < types.length; i += 1) {
      notecardTypeMap[types[i].id] = types[i];
    }
    callback(err, notecardTypeMap);
  });
};

/*
CREATE
*/
exports.createNotecardType = (json, callback) => {
  const newCardType = new NotecardType({
    name: json.name,
  });
  newCardType.save((err) => {
    callback(err, newCardType);
  });
};

/*
DELETE
*/
exports.deleteNotecardType = (id, callback) => {
  NotecardType.findByIdAndRemove(id, {}, (err, result) => {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateNotecardType = (id, json, callback) => {
  NotecardType.findByIdAndUpdate(id, { $set: json }, { new: true }, (err, result) => {
    callback(err, result);
  });
};
