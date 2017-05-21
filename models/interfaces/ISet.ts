import mongoose = require("mongoose");

interface ISet {
  notecard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notecard'; }]
  tags: [{ type: String }]
  valuations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Valuation'; }]
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'; }
  lastchange: Date;
  visibility: Boolean;
  photourl: String;
};

export = ISet;