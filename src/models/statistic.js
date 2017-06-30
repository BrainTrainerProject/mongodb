import mongoose from 'mongoose';
import async from 'async';

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
*/
exports.createStatistic = (json, callback) => {
  const newStatistic = new Statistic({
    profile: json.profile,
    notecard: json.notecard,
    successfultries: json.successfultries,
    totaltries: json.totaltries,
  });
  newStatistic.save((err) => {
    callback(err, newStatistic);
  });
};

exports.createStatisticMultiple = (statistics, callback) => {
  Statistic.create(statistics, (err, result) => {
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
  Statistic.findByIdAndUpdate(id, { $set: json }, { new: true }, (err, result) => {
    callback(err, result);
  });
};

exports.updateStatisticMultiple = (statistics, callback) => {
  async.eachSeries(statistics, (statistic, result) => {
    Statistic.findByIdAndUpdate(statistic.id, { $set: {
      profile: statistic.profile,
      notecard: statistic.notecard,
      successfultries: statistic.successfultries,
      totaltries: statistic.totaltries,
    } }, { new: true }, (err) => {
      callback(err, result);
    });
  });
};
