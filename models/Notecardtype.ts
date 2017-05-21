import mongoose = require("mongoose");
import INotecardtype = require("./interfaces/INotecardtype");


interface INotecardtypeModel extends INotecardtype, mongoose.Document {
  
 }


var NotecardtypeSchema = new mongoose.Schema({
    name: String
});

var Notecardtype = mongoose.model<INotecardtypeModel>("Notecardtype", NotecardtypeSchema);

export = Notecardtype;
