import mongoose from 'mongoose';
import mapper from './mapper';

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
      callback(err, mapper.convertStatisticToJsonResponse(statistic));
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
  Statistic.find({}, (err, statistics) => {
    const statisticMap = {};
    for (let i = 0; i < statistics.length; i += 1) {
      statisticMap[statistics[i].id] = mapper.convertStatisticToJsonResponse(statistics[i]);
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
