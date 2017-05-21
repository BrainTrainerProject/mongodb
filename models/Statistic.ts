import mongoose = require("mongoose");
import IStatistic = require("./interfaces/IStatistic");


interface IStatisticModel extends IStatistic, mongoose.Document {
  
 }


var StatisticSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  notecard: { type: mongoose.Schema.Types.ObjectId, ref: 'Notecard' },
  successfultries: Number,
  totaltries: Number
});

var Statistic = mongoose.model<IStatisticModel>("Statistic", StatisticSchema);

export = Statistic;
