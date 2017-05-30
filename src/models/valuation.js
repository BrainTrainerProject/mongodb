import mongoose from 'mongoose';
import mongodb from 'mongodb';
import mapper from './mapper';

const ObjectId = mongodb.ObjectID;

const ValuationSchema = mongoose.Schema({
  score: Number,
  comment: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: Date,
});

const Valuation = mongoose.model('Valuation', ValuationSchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Valuation.findOne({ id: ObjectId(id) }, (err, valuation) => {
    if (!err && valuation) {
      callback(err, mapper.convertValuationToJsonResponse(valuation));
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
  Valuation.find({}, (err, valuations) => {
    const valuationMap = {};
    for (let i = 0; i < valuations.length; i += 1) {
      valuationMap[valuations[i].id] = mapper.convertValuationToJsonResponse(valuations[i]);
    }
    callback(err, valuationMap);
  });
};

/*
CREATE
*/
exports.createValuation = (json, callback) => {
  const newValuation = new Valuation({
    score: json.score,
    comment: json.comment,
    profile: json.profile,
    createdAt: json.createdAt,
  });
  newValuation.save((err) => {
    callback(err, newValuation);
  });
};

/*
DELETE
*/
exports.deleteValuation = (id, callback) => {
  Valuation.findOneAndRemove({ _id: ObjectId(id) },
    (err, result) => {
      if (err) return (callback(new Error('Delete Valuation', 500), result));
      return result;
    });
};

/*
UPDATE
*/
exports.updateValuation = (id, json, callback) => {
  Valuation.findOneAndUpdate({ _id: ObjectId(id) }, {
    $set: json,
  }, (err, result) => {
    if (err) return (callback(new Error('Update Valuation', 400), result));
    return result;
  });
};
