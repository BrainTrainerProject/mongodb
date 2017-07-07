import mongoose from 'mongoose';

const json2mongo = require('json2mongo');

const StatisticSchema = mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  notecard: { type: mongoose.Schema.Types.ObjectId, ref: 'Notecard' },
  successfultries: Number,
  totaltries: Number,
});

const Statistic = mongoose.model('Statistic', StatisticSchema);

/*
READ ONE
*/
exports.findById = (id, callback) => {
  const isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if (!isValidObjectId) {
    return callback(new Error('Invalid ObjectId', 400), null);
  }
  Statistic.findById(id, (err, statistic) => {
    if (!err && statistic) {
      callback(err, statistic);
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
  Statistic.find({ profile: id }, (err, statistics) => {
    callback(err, statistics);
  });
};

exports.findByNotecardsAndOwner = (notecards, id, callback) => {
  Statistic.find({ $and: [{ notecard: { $in: notecards } }, { profile: id }] },
    (err, statistics) => {
      callback(err, statistics);
    });
};

/*
READ ALL
*/
exports.findAll = (callback) => {
  Statistic.find({}, (err, statistics) => {
    callback(err, statistics);
  });
};

/*
CREATE
@TODO: createStatisticMultiple ueberfluessig
*/
exports.createStatistic = (json, callback) => {
  Statistic.collection.insert(json2mongo(json), (err, newStatistic) => {
    callback(err, newStatistic);
  });
};

exports.createStatisticMultiple = (statistics, callback) => {
  Statistic.collection.insert(json2mongo(statistics), (err, result) => {
    callback(err, result);
  });
};

/*
DELETE
*/
exports.deleteStatistic = (id, callback) => {
  Statistic.findByIdAndRemove(id, {}, (err, result) => {
    callback(err, result);
  });
};

/*
UPDATE
*/
exports.updateStatistic = (id, json, callback) => {
  const mongo = json2mongo(json);
  Statistic.findByIdAndUpdate(id, { $set: mongo }, { new: true }, (err, result) => {
    callback(err, result);
  });
};

exports.updateStatisticMultiple = (statistics, callback) => {
  console.log('start update multiple');
  for (let i = 0; i < statistics.length; i += 1) {
    Statistic.findByIdAndUpdate(statistics[i].id, { $set: {
      profile: statistics[i].profile,
      notecard: statistics[i].notecard,
      successfultries: statistics[i].successfultries,
      totaltries: statistics[i].totaltries,
    } }, { new: true }, (err, result) => {
      callback(err, result);
    });
  }
  console.log('ende update multiple');
};
