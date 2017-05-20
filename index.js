const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var notecardSchema = Schema({
  _id: string,
  title: string,
  task: string,
  answer: string
});

module.exports = {
  Notecard: mongoose.model('Notecard', notecardSchema)
}
