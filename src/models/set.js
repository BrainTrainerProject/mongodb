import mongoose from 'mongoose';
import mapper from './mapper';

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
  Set.findById(id, (err, set) => {
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
  Set.findByIdAndRemove(id, {}, (err, result) => {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateSet = (id, json, callback) => {
  Set.findByIdAndUpdate(id, { $set: json }, { new: true }, (err, result) => {
    callback(err, result);
  });
};
