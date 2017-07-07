import index from '../../index';

const chai = require('chai');
const mocha = require('mocha');
const DB = require('../db');
const fixtures = require('../fixtures/model-notecards');

const Notecard = index.notecard;

mocha.describe('Model Notecard Test', () => {
  mocha.before((done) => {
    DB.connect(done);
  });

  mocha.beforeEach((done) => {
    DB.drop();
    DB.fixtures(fixtures, done);
    return null;
  });

  mocha.it('dummy', (done) => {
    done();
  });


  mocha.it('findNotecardByOwner', (done) => {
    Notecard.findByOwner('593abcb5fc13ae6bea000000', (err, cards) => {
      chai.assert.equal(cards[0].owner, '593abcb5fc13ae6bea000000');
      chai.assert.equal(cards.length, 1);
      done();
    });
  });

  mocha.it('findNotecardById', (done) => {
    Notecard.findById('59565cdb4af33428880ea264', (err, card) => {
      chai.assert.equal(card.id, '59565cdb4af33428880ea264');
      done();
    });
  });


  /* mocha.it('findAllNotecards', (done) => {
    Notecard.findAll = (err, cards) => {
      if (err) { done(new Error(err)); }
      chai.assert.equal(cards.length, 2);
      done();
    };
  });*/

/*
  mocha.it('create', (done) => {
    Notecard.createNotecard(
      {
        title: 'Englisch Vokabeln',
        task: 'Was heißt comment?',
        answer: 'Kommentar',
        owner: '595565bdb17a5d2248b107b0',
        lastchange: '12/11/2016',
        type: '595565bdb17a5d2248b107b0',
      }, (err, newCard) => {
      chai.expect(newCard.title).to.equal('Englisch Vokabeln');
    });
    Notecard.findByOwner('595565bdb17a5d2248b107b0', (err, cards) => {
      chai.assert.equal(cards.length, 1);
      chai.expect(cards[0].owner).to.equal('595565bdb17a5d2248b107b0');
      done();
    });
    console.log('ende create');
    return null;
  });*/

  mocha.after((done) => {
    DB.drop();
    done();
    return null;
  });

  // Test Delete remove update
});
