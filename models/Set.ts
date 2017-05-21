import mongoose = require("mongoose");
import ISet = require("./interfaces/ISet");


interface ISetModel extends ISet, mongoose.Document {
  
 }


var SetSchema = new mongoose.Schema({
  notecard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notecard' }],
  tags: [{ type: String }],
  valuations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Valuation' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  visibility: Boolean,
  photourl: String
});

var Set = mongoose.model<ISetModel>("Set", SetSchema);

export = Set;
