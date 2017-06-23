import mongoose from 'mongoose';

const SetSchema = mongoose.Schema({
  notecard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notecard' }],
  tags: [{ type: String }],
  valuations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Valuation' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  visibility: Boolean,
  photourl: String,
  title: String,
  description: String,
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
      callback(err, set);
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ ALL By Owner
*/
exports.findByOwner = (id, callback) => {
  Set.find({ owner: id }, (err, sets) => {
    callback(err, sets);
  });
};

/*
READ ALL
*/
exports.findAll = (callback) => {
  Set.find({}, (err, sets) => {
    callback(err, sets);
  });
};

exports.search = (searchParam, callback) => {
  Set.find({ $or: [{ tags: { $in: searchParam } },
   { title: { $in: searchParam } }] }, (err, sets) => {
    callback(err, sets);
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
    title: json.title,
    description: json.description,
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

exports.addNotecards = (id, notecardlist, callback) => {
  Set.findByIdAndUpdate(id, { $push: { notecard: { $each: notecardlist } } },
   { new: true }, (err, result) => {
     callback(err, result);
   });
};

exports.removeNotecards = (id, notecardlist, callback) => {
  Set.findByIdAndUpdate(id, { $pullAll: { notecard: notecardlist } },
   (err, result) => {
     callback(err, result);
   });
};

exports.addTags = (id, taglist, callback) => {
  Set.findByIdAndUpdate(id, { $push: { tags: { $each: taglist } } },
   { new: true }, (err, result) => {
     callback(err, result);
   });
};

exports.removeTags = (id, taglist, callback) => {
  Set.findByIdAndUpdate(id, { $pullAll: { tags: taglist } },
   (err, result) => {
     callback(err, result);
   });
};

exports.addValuations = (id, valuationlist, callback) => {
  Set.findByIdAndUpdate(id, { $push: { valuations: { $each: valuationlist } } },
   { new: true }, (err, result) => {
     callback(err, result);
   });
};

exports.removeValuations = (id, valuationlist, callback) => {
  Set.findByIdAndUpdate(id, { $pullAll: { valuations: valuationlist } },
   (err, result) => {
     callback(err, result);
   });
};
