const chai = require('chai');
const mocha = require('mocha');
const DB = require('../db');
const fixtures = require('../fixtures/model-notecards.json');
const Notecard = require('../../models/notecard');

mocha.describe('Model Notecard Test', () => {
  mocha.before((done) => {
    DB.connect(done);
  });

  mocha.beforeEach((done) => {
    DB.drop((err) => {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
      done();
      return null;
    });
  });

  mocha.it('all', (done) => {
    Notecard.findAll((err, notecards) => {
      chai.assert.lengthOf(notecards, 1, 'eine notecard');
      done();
    });
  });

  mocha.it('create', (done) => {
    Notecard.createNotecard(
      {
        id: '',
        title: 'Englisch Vokabeln',
        task: 'Was heißt comment?',
        answer: 'Kommentar',
        owner: '',
        lastchange: '2017-06-09T18:25:43.511Z',
        type: '',
      },
    () => {
      Notecard.findAll((err, notecards) => {
        chai.assert.lengthOf(notecards, 1, 'create 1');
        chai.assert.equal(notecards[0].answer, 'Kommentar', 'Answer equal');
        done();
      });
    });
    return null;
  });

  // Test Delete remove
});
