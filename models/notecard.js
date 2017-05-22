const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const mapper = require('./mapper');

var Schema = mongoose.Schema;

var notecardSchema = Schema({
  _id: String,
  title: String,
  task: String,
  answer: String
});
var Notecard = mongoose.model('Notecard', notecardSchema);

exports.findById = function(id, callback) {
  var isValidObjectId = (id.match(/^[0-9a-fA-F]{24}$/));
  if(!isValidObjectId) return cb(new Error("Invalid ObjectId", 400), null);

  Notecard.findOne({'_id': ObjectId(id)}, function(err, card) {
    if(!err && card) {
      callback(err, mapper.convertNotecardToJsonResponse(card));
    } else {
        callback(err, null);
    }
  });
}

exports.findAll = function(callback) {
  Notecard.find({}, function(err, cards) {
    var notecardMap = {};
    for(var i = 0; i < cards.length; i++) {
        notecardMap[cards[i]._id] = mapper.convertNotecardToJsonResponse(cards[i]);
    }
    callback(err, notecardMap);
  });
}

exports.createNotecard = function(json, callback) {
  var newCard = new Notecard({
    _id: json.id,
    title: json.title,
    task: json.task,
    answer: json.answer
  });
  newCard.save(function(err) {
    callback(err);
  });
}
