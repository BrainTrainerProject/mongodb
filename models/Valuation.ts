import mongoose = require("mongoose");
import IValuation = require("./interfaces/IValuation");


interface IValuationModel extends IValuation, mongoose.Document {
  
 }


var ValuationSchema = new mongoose.Schema({
  score: Number,
  comment: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  createdAt: Date
});

var Valuation = mongoose.model<IValuationModel>("Valuation", ValuationSchema);

export = Valuation;
