import mongoose from 'mongoose';

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
  Statistic.find({ profile: id }).toArray()
  .exec((err, statistics) => {
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
    const statisticMap = {};
    for (let i = 0; i < statistics.length; i += 1) {
      statisticMap[statistics[i].id] = statistics[i];
    }
    callback(err, statisticMap);
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

exports.createStatistic = (statistics, callback) => {
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

exports.updateStatistic = (statistics, callback) => {
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
};
