import mongoose = require("mongoose");
import IProfile = require("./interfaces/IProfile");


interface IProfileModel extends IProfile, mongoose.Document {
  
 }


var ProfileSchema = new mongoose.Schema({
  email: String,
  oauthtoken: String,
  photourl: String,
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  visibility: Boolean,
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }]
});

var Profile = mongoose.model<IProfileModel>("Profile", ProfileSchema);

export = Profile;
