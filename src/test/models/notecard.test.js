const chai = require('chai');
const mocha = require('mocha');
const DB = require('../db');
// const fixtures = require('../fixtures/model-notecards');
const Notecard = require('../../models/notecard');

mocha.describe('Model Notecard Test', () => {
  mocha.before((done) => {
    DB.connect(done);
  });

  mocha.beforeEach((done) => {
    console.log('dropping DB');
    /* DB.drop((err) => {
      if (err) return done(err);
      console.log('loading fixtures');
      DB.fixtures(fixtures, done);
      console.log('fixtures loaded successfully');
      done();
      return null;
    });*/
    // DB.fixtures(fixtures, done);
    return done();
  });

  mocha.it('all', (done) => {
    Notecard.findAll((err, notecards) => {
      chai.expect(notecards.length).to.equal(1);
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
