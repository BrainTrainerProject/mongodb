'use strict';

var chai = require('chai');
var mocha = require('mocha');
var DB = require('../db');
var fixtures = require('../fixtures/model-notecards.json');
var Notecard = require('../../models/notecard');

mocha.describe('Model Notecard Test', function () {
  mocha.before(function (done) {
    DB.connect(done);
  });

  mocha.beforeEach(function (done) {
    DB.drop(function (err) {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
      done();
      return null;
    });
  });

  mocha.it('all', function (done) {
    Notecard.findAll(function (err, notecards) {
      chai.assert.lengthOf(notecards, 1, 'eine notecard');
      done();
    });
  });

  mocha.it('create', function (done) {
    Notecard.createNotecard({
      id: '',
      title: 'Englisch Vokabeln',
      task: 'Was heißt comment?',
      answer: 'Kommentar',
      owner: '',
      lastchange: '2017-06-09T18:25:43.511Z',
      type: ''
    }, function () {
      Notecard.findAll(function (err, notecards) {
        chai.assert.lengthOf(notecards, 1, 'create 1');
        chai.assert.equal(notecards[0].answer, 'Kommentar', 'Answer equal');
        done();
      });
    });
    return null;
  });

  // Test Delete remove
});