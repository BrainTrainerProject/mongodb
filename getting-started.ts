
import Notecard = require("./models/Notecard");
import Profile = require("./models/Profile");
import Notecardtype = require("./models/Notecardtype");
import Set = require("./models/Set");
import Statistic = require("./models/Statistic");
import Valuation = require("./models/Valuation");
import mongoose = require("mongoose");

var profileTest = new Profile({
  id: 25
});
console.log("\n" + profileTest._id);

var notecardTest = new Notecard({
  title: "test",
  owner: profileTest._id
});
console.log(notecardTest._id);
console.log("\n" + notecardTest.title);
console.log("\n" + notecardTest.owner);


mongoose.connect('mongodb://brain:Trainer#2017@ds057806.mlab.com:57806/heroku_b8p1c09m');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

});

notecardTest.save(function (err, notecardTest) {
  if (err) return console.error(err);
});

Notecard.find(function(err, notecards) {
  if(err) return console.error(err);
  console.log(notecards);
});

profileTest.save(function (err, profileTest) {
  if (err) return console.error(err);
});

