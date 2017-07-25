import index from '../../index';

const chai = require('chai');
const mocha = require('mocha');
const DB = require('../db');
const fixtures = require('../fixtures/model-statistics');

const Statistic = index.statistic;

mocha.describe('Model Statistic Test', () => {
  mocha.before((done) => {
    DB.connect(done);
  });

  mocha.it('load fixtures', (done) => {
    DB.dropAndLoad(fixtures, done);
  });

  /* mocha.beforeEach((done) => {
    DB.dropAndLoad(fixtures, done);
    return null;
  }); */

  mocha.it('dummy', (done) => {
    // nicht loeschen
    done();
  });

  mocha.it('findStatisticByOwner', (done) => {
    Statistic.findByOwner('595d61600000000000000000', (err, statistics) => {
      if (err) { done(new Error(err)); }
      chai.assert.equal(statistics[0].profile, '595d61600000000000000000');
      chai.assert.equal(statistics.length, 1);
      done();
    });
  });

  mocha.it('createStatistic', (done) => {
    const json = {
      profile: { $oid: '593abcb5fc13ae6bea000000' },
      notecard: { $oid: '593abcb5fc13ae6bea000000' },
      successfultries: 20,
      totaltries: 22,
    };
    Statistic.createStatistic(json, (err, result) => {
      if (err) { done(new Error(err)); }
      return result;
    });
    Statistic.findByOwner('593abcb5fc13ae6bea000000', (err, statistics) => {
      chai.assert.equal(statistics[0].successfultries, 20);
      done();
    });
  });

  mocha.it('createStatisticMultiple', (done) => {
    const json = [{
      profile: { $oid: '593abcb5fc13ae6bea000000' },
      notecard: { $oid: '593abcb5fc13ae6bea000000' },
      successfultries: 9,
      totaltries: 12,
    }, {
      profile: { $oid: '593abcb5fc13ae6bea000000' },
      notecard: { $oid: '593abcb5fc13ae6bea000000' },
      successfultries: 8,
      totaltries: 14,
    },
    ];
    Statistic.createStatisticMultiple(json, (err, result) => {
      if (err) { done(new Error(err)); }
      done();
      return result;
    });
  });

  mocha.it('find created multipleStatistics', (done) => {
    Statistic.findByOwner('593abcb5fc13ae6bea000000', (err, statistics) => {
      chai.assert.equal(statistics[1].successfultries, 9);
      chai.assert.equal(statistics[2].successfultries, 8);
      done();
    });
  });

  mocha.it('updateStatistic', (done) => {
    Statistic.findByOwner('595d61600000000000000000', (err, statistics) => {
      chai.assert.equal(statistics[0].successfultries, 3);
      const id = String(statistics[0].id);
      chai.assert.equal(String(statistics[0].id), id);

      const json = {
        profile: { $oid: '595d61600000000000000000' },
        notecard: { $oid: '59565cdb4af33428880ea264' },
        successfultries: 45,
        totaltries: 6,
      };
      Statistic.updateStatistic(id, json, (err2, result) => {
        if (err2) { done(new Error(err2)); }
        Statistic.findByOwner('595d61600000000000000000', (err3, statistics2) => {
          chai.assert.equal(statistics2[0].successfultries, 45);
          done();
        });
        return result;
      });
    });
  });

  mocha.after((done) => {
    DB.disconnect(done);
  });

  // Test Delete remove update
});
