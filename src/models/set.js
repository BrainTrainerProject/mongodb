import mongoose from 'mongoose';
import mongodb from 'mongodb';
import mapper from './mapper';

const ObjectId = mongodb.ObjectID;

const SetSchema = mongoose.Schema({
  notecard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notecard' }],
  tags: [{ type: String }],
  valuations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Valuation' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  visibility: Boolean,
  photourl: String,
});

const Set = mongoose.model('Set', SetSchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Set.findOne({ id: ObjectId(id) }, (err, set) => {
    if (!err && set) {
      callback(err, mapper.convertSetToJsonResponse(set));
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
  Set.find({}, (err, sets) => {
    const setMap = {};
    for (let i = 0; i < sets.length; i += 1) {
      setMap[sets[i].id] = mapper.convertSetToJsonResponse(sets[i]);
    }
    callback(err, setMap);
  });
};

/*
CREATE
*/
exports.createSet = (json, callback) => {
  const newSet = new Set({
    notecard: json.notecard,
    tags: json.tags,
    valuations: json.valuations,
    owner: json.owner,
    lastchange: json.lastchange,
    visibility: json.visibility,
    photourl: json.photourl,
  });
  newSet.save((err) => {
    callback(err, newSet);
  });
};

/*
DELETE
*/
exports.deleteSet = (id, callback) => {
  Set.findOneAndRemove({ _id: ObjectId(id) },
    (err, result) => {
      if (err) return (callback(new Error('Delete Set', 500), result));
      return result;
    });
};

/*
UPDATE
*/
exports.updateSet = (id, json, callback) => {
  Set.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json,
  }, (err, result) => {
    if (err) return (callback(new Error('Update Set', 400), result));
    return result;
  });
};
