import mongoose = require("mongoose");

interface IProfile {
  email: String;
  oauthtoken: String;
  photourl: String;
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile'; }]
  visibility: Boolean;
  sets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set'; }]
};

export = IProfile;