import mongoose = require("mongoose");

interface INotecard {
  title: String;
  task: String;
  answer: String;
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'; }
  lastchange: Date;
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Notecardtype'; }
};

export = INotecard;