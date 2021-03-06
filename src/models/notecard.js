import mongoose from 'mongoose';

const notecardSchema = mongoose.Schema({
  title: String,
  task: String,
  answer: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Notecardtype' },
});
const Notecard = mongoose.model('Notecard', notecardSchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Notecard.findById(id, (err, card) => {
    if (!err && card) {
      callback(err, card);
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
  Notecard.find({ owner: id }, (err, cards) => {
    callback(err, cards);
  });
};

/*
READ ALL
*/
exports.findAll = (callback) => {
  Notecard.find({}, (err, cards) => {
    callback(err, cards);
  });
};

/*
CREATE
*/
exports.createNotecard = (json, callback) => {
  const newCard = new Notecard({
    title: json.title,
    task: json.task,
    answer: json.answer,
    owner: json.owner,
    lastchange: json.lastchange,
    type: json.type,
  });
  newCard.save((err) => {
    callback(err, newCard);
  });
};

/*
DELETE
*/
exports.deleteNotecard = (id, callback) => {
  Notecard.findByIdAndRemove(id, {}, (err, result) => {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateNotecard = (id, json, callback) => {
  Notecard.findByIdAndUpdate(id, { $set: json }, { new: true }, (err, result) => {
    callback(err, result);
  });
};
