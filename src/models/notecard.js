import mongoose from 'mongoose';
import mongodb from 'mongodb';
import mapper from './mapper';

const ObjectId = mongodb.ObjectID;

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
READ
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Notecard.findOne({ id: ObjectId(id) }, (err, card) => {
    if (!err && card) {
      callback(err, mapper.convertNotecardToJsonResponse(card));
    } else {
      callback(err, null);
    }
  });
  return null;
};

/*
READ
*/
exports.findAll = (callback) => {
  Notecard.find({}, (err, cards) => {
    const notecardMap = {};
    for (let i = 0; i < cards.length; i += 1) {
      notecardMap[cards[i].id] = mapper.convertNotecardToJsonResponse(cards[i]);
    }
    callback(err, notecardMap);
  });
};

/*
CREATE
*/
exports.createNotecard = (json, callback) => {
  const newCard = new Notecard({
    id: json.id,
    title: json.title,
    task: json.task,
    answer: json.answer,
    owner: json.owner,
    lastchange: json.lastchange,
    type: json.type,
  });
  newCard.save((err) => {
    callback(err);
  });
};

/*
DELETE
*/
exports.deleteNotecard = (id, callback) => {
  Notecard.findOneAndRemove({ _id: ObjectId(id) },
    (err, result) => {
      if (err) return (callback(new Error('Delete Notecard', 500), result));
      return result;
    });
};

/*
UPDATE
*/
exports.updateNotecard = (id, title, json, callback) => {
  Notecard.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json,
  }, (err, result) => {
    if (err) return (callback(new Error('Update Notecard', 400), result));
    return result;
  });
};
