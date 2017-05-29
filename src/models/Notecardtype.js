import mongoose from 'mongoose';
import mongodb from 'mongodb';
import mapper from './mapper';

const ObjectId = mongodb.ObjectID;

const notecardTypeSchema = mongoose.Schema({
  name: String,
});

const NotecardType = mongoose.model('Notecardtype', notecardTypeSchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  NotecardType.findOne({ id: ObjectId(id) }, (err, type) => {
    if (!err && type) {
      callback(err, mapper.convertNotecardTypeToJsonResponse(type));
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
      notecardTypeMap[types[i].id] = mapper.convertNotecardTypeToJsonResponse(types[i]);
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
    callback(err);
  });
};

/*
DELETE
*/
exports.deleteNotecardType = (id, callback) => {
  NotecardType.findOneAndRemove({ _id: ObjectId(id) },
    (err, result) => {
      if (err) return (callback(new Error('Delete NotecardType', 500), result));
      return result;
    });
};

/*
UPDATE
*/
exports.updateNotecardType = (id, json, callback) => {
  NotecardType.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json,
  }, (err, result) => {
    if (err) return (callback(new Error('Update NotecardType', 400), result));
    return result;
  });
};
