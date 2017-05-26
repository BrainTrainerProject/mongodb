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
