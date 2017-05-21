import mongoose = require("mongoose");
import INotecard = require("./interfaces/INotecard");


interface INotecardModel extends INotecard, mongoose.Document {
  
 }


var NotecardSchema = new mongoose.Schema({
  title: String,
  task: String,
  answer: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  lastchange: Date,
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Notecardtype' }
});

var Notecard = mongoose.model<INotecardModel>("Notecard", NotecardSchema);

export = Notecard;
