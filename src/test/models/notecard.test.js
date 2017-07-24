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

  mocha.it('load fixtures', (done) => {
    DB.dropAndLoad(fixtures, done);
  });

  /* mocha.beforeEach((done) => {
    // javascript promises needed!
    DB.dropAndLoad(fixtures, done);
    return null;
  });*/

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


  mocha.it('findAllNotecards', (done) => {
    Notecard.findAll = (err, cards) => {
      console.log('notecardtest length ', cards.length);
      chai.assert.equal(cards.length, 2);
      done();
    };
  }).timeout(30000);

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
  });

  mocha.it('delete Notecard', (done) => {
    done();
  });

  mocha.after((done) => {
    done();
    return null;
  });

  // Test Delete update
});
