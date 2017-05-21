import mongoose = require("mongoose");

interface IStatistic {
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'; }
  notecard: { type: mongoose.Schema.Types.ObjectId, ref: 'Notecard'; }
  successfultries: Number;
  totaltries: Number; 
};

export = IStatistic;