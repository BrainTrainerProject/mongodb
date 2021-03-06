import index from '../../index';

const chai = require('chai');
const mocha = require('mocha');
const DB = require('../db');
// const fixtures = require('../fixtures/model-statistics');

const Statistic = index.statistic;

mocha.describe('Model Statistic Test', () => {
  mocha.before((done) => {
    DB.connect(done);
  });

/*  mocha.it('load fixtures', (done) => {
    DB.dropAndLoad(fixtures, done);
  }).timeout(20000); */

  /* mocha.beforeEach((done) => {
    DB.dropAndLoad(fixtures, done);
    return null;
  }); */

  mocha.it('dummy', (done) => {
    // nicht loeschen
    done();
  }).timeout(5000);

/*  mocha.it('findStatisticByOwner', (done) => {
    Statistic.findByOwner('595d61600000000000000000', (err, statistics) => {
      chai.assert.equal(statistics[0].profile, '595d61600000000000000000');
      chai.assert.equal(statistics.length, 1);
      done();
    });
  }).timeout(5000); */

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
  }).timeout(5000);

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
  }).timeout(5000);

  mocha.it('find created multipleStatistics', (done) => {
    Statistic.findByOwner('593abcb5fc13ae6bea000000', (err, statistics) => {
      chai.assert.equal(statistics[1].successfultries, 9);
      chai.assert.equal(statistics[2].successfultries, 8);
      done();
    });
  }).timeout(5000);

  mocha.it('updateStatistic', (done) => {
    Statistic.findByOwner('595d61600000000000000000', (err, statistics) => {
      chai.assert.equal(statistics[0].successfultries, 45);
      const id = String(statistics[0].id);
      chai.assert.equal(String(statistics[0].id), id);

      const json = {
        profile: { $oid: '595d61600000000000000000' },
        notecard: { $oid: '59565cdb4af33428880ea264' },
        successfultries: 3,
        totaltries: 6,
      };
      Statistic.updateStatistic(id, json, (err2, result) => {
        if (err2) { done(new Error(err2)); }
        done();
        return result;
      });
    });
  }).timeout(5000);

  mocha.it('find updated statistic', (done) => {
    Statistic.findByOwner('595d61600000000000000000', (err3, statistics2) => {
      chai.assert.equal(statistics2[0].successfultries, 3);
      done();
    });
  });

  mocha.after((done) => {
    DB.disconnect(done);
  });

  // Test Delete remove update
});
