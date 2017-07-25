'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
var mocha = require('mocha');
var DB = require('../db');
var fixtures = require('../fixtures/model-statistics');

var Statistic = _index2.default.statistic;

mocha.describe('Model Statistic Test', function () {
  mocha.before(function (done) {
    DB.connect(done);
  });

  mocha.it('load fixtures', function (done) {
    DB.dropAndLoad(fixtures, done);
  });

  /* mocha.beforeEach((done) => {
    DB.dropAndLoad(fixtures, done);
    return null;
  }); */

  mocha.it('dummy', function (done) {
    // nicht loeschen
    done();
  });

  mocha.it('findStatisticByOwner', function (done) {
    Statistic.findByOwner('595d61600000000000000000', function (err, statistics) {
      if (err) {
        done(new Error(err));
      }
      chai.assert.equal(statistics[0].profile, '595d61600000000000000000');
      chai.assert.equal(statistics.length, 1);
      done();
    });
  });

  mocha.it('createStatistic', function (done) {
    var json = {
      profile: { $oid: '593abcb5fc13ae6bea000000' },
      notecard: { $oid: '593abcb5fc13ae6bea000000' },
      successfultries: 20,
      totaltries: 22
    };
    Statistic.createStatistic(json, function (err, result) {
      if (err) {
        done(new Error(err));
      }
      return result;
    });
    Statistic.findByOwner('593abcb5fc13ae6bea000000', function (err, statistics) {
      chai.assert.equal(statistics[0].successfultries, 20);
      done();
    });
  });

  mocha.it('createStatisticMultiple', function (done) {
    var json = [{
      profile: { $oid: '593abcb5fc13ae6bea000000' },
      notecard: { $oid: '593abcb5fc13ae6bea000000' },
      successfultries: 9,
      totaltries: 12
    }, {
      profile: { $oid: '593abcb5fc13ae6bea000000' },
      notecard: { $oid: '593abcb5fc13ae6bea000000' },
      successfultries: 8,
      totaltries: 14
    }];
    Statistic.createStatisticMultiple(json, function (err, result) {
      if (err) {
        done(new Error(err));
      }
      done();
      return result;
    });
  });

  mocha.it('find created multipleStatistics', function (done) {
    Statistic.findByOwner('593abcb5fc13ae6bea000000', function (err, statistics) {
      chai.assert.equal(statistics[1].successfultries, 9);
      chai.assert.equal(statistics[2].successfultries, 8);
      done();
    });
  });

  mocha.it('updateStatistic', function (done) {
    Statistic.findByOwner('595d61600000000000000000', function (err, statistics) {
      chai.assert.equal(statistics[0].successfultries, 3);
      var id = String(statistics[0].id);
      chai.assert.equal(String(statistics[0].id), id);

      var json = {
        profile: { $oid: '595d61600000000000000000' },
        notecard: { $oid: '59565cdb4af33428880ea264' },
        successfultries: 45,
        totaltries: 6
      };
      Statistic.updateStatistic(id, json, function (err2, result) {
        if (err2) {
          done(new Error(err2));
        }
        Statistic.findByOwner('595d61600000000000000000', function (err3, statistics2) {
          chai.assert.equal(statistics2[0].successfultries, 45);
          done();
        });
        return result;
      });
    });
  });

  mocha.after(function (done) {
    DB.disconnect(done);
  });

  // Test Delete remove update
});