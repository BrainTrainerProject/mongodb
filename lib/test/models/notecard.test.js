'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
var mocha = require('mocha');
var DB = require('../db');
var fixtures = require('../fixtures/model-notecards');

var Notecard = _index2.default.notecard;

mocha.describe('Model Notecard Test', function () {
  mocha.before(function (done) {
    DB.connect(done);
  });

  mocha.it('load fixtures', function (done) {
    DB.dropAndLoad(fixtures, done);
  });

  /* mocha.beforeEach((done) => {
    // javascript promises needed!
    DB.dropAndLoad(fixtures, done);
    return null;
  });*/

  mocha.it('dummy', function (done) {
    done();
  });

  mocha.it('findNotecardByOwner', function (done) {
    Notecard.findByOwner('593abcb5fc13ae6bea000000', function (err, cards) {
      chai.assert.equal(cards[0].owner, '593abcb5fc13ae6bea000000');
      chai.assert.equal(cards.length, 1);
      done();
    });
  });

  mocha.it('findNotecardById', function (done) {
    Notecard.findById('59565cdb4af33428880ea264', function (err, card) {
      chai.assert.equal(card.id, '59565cdb4af33428880ea264');
      done();
    });
  });

  mocha.it('findAllNotecards', function (done) {
    Notecard.findAll = function (err, cards) {
      console.log('notecardtest length ', cards.length);
      chai.assert.equal(cards.length, 2);
      done();
    };
  }).timeout(30000);

  mocha.it('create', function (done) {
    Notecard.createNotecard({
      title: 'Englisch Vokabeln',
      task: 'Was heißt comment?',
      answer: 'Kommentar',
      owner: '595565bdb17a5d2248b107b0',
      lastchange: '12/11/2016',
      type: '595565bdb17a5d2248b107b0'
    }, function (err, newCard) {
      chai.expect(newCard.title).to.equal('Englisch Vokabeln');
    });
    Notecard.findByOwner('595565bdb17a5d2248b107b0', function (err, cards) {
      chai.assert.equal(cards.length, 1);
      chai.expect(cards[0].owner).to.equal('595565bdb17a5d2248b107b0');
      done();
    });
    console.log('ende create');
    return null;
  });

  mocha.it('delete Notecard', function (done) {
    done();
  });

  mocha.after(function (done) {
    done();
    return null;
  });

  // Test Delete update
});