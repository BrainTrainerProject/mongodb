'use strict';

var chai = require('chai');
var mocha = require('mocha');
var DB = require('../db');
var fixtures = require('../fixtures/model-notecards');
var Notecard = require('../../models/notecard');

mocha.describe('Model Notecard Test', function () {
  mocha.before(function (done) {
    DB.connect(done);
  });

  mocha.beforeEach(function (done) {
    console.log('dropping DB');
    DB.drop();
    console.log('loading fixtures');
    DB.fixtures(fixtures, done);
    return null;
  });

  mocha.it('dummy', function (done) {
    done();
  });

  mocha.it('findById', function (done) {
    Notecard.findById('593abcb5fc13ae6bea000000', function (err, card) {
      chai.expect(card.id).to.equal('593abcb5fc13ae6bea000000');
      done();
    });
  });

  /*  mocha.it('create', (done) => {
      Notecard.createNotecard(
        {
          id: '',
          title: 'Englisch Vokabeln',
          task: 'Was heißt comment?',
          answer: 'Kommentar',
          owner: '',
          lastchange: '2017-06-09T18:25:43.511Z',
          type: '',
        }, () => {
        Notecard.findAll((err, notecards) => {
          chai.expect(notecards.length).to.equal(1);
          done();
        });
      });
      console.log('ende create');
      return null;
    });*/

  // Test Delete remove
});