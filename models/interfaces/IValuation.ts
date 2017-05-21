import mongoose = require("mongoose");

interface IValuation {
  score: Number;
  comment: String;
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'; }
  createdAt: Date;
};

export = IValuation;