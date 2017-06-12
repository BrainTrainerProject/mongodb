'use strict';

var dbClient = require('mongodb').MongoClient;
var async = require('async');

var state = {
  db: null
};

var uri = 'mongodb://127.0.0.1:27017/test';

exports.connect = function (done) {
  if (state.db) return done();

  dbClient.connect(uri, function (err, db) {
    if (err) return done(err);
    state.db = db;
    done();
    return null;
  });
  return null;
};

exports.getDB = function () {
  return state.db;
};

exports.drop = function (done) {
  if (!state.db) return done();
  state.db.collections(function (err, collections) {
    async.each(collections, function (collection, cb) {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb();
      }
      collection.remove(cb);
      return null;
    }, done);
  });
  return null;
};

exports.fixtures = function (data, done) {
  var db = state.db;
  if (!db) {
    return done(new Error('Missing database connection'));
  }
  var names = Object.keys(data.collections);
  async.each(names, function (name, cb) {
    db.createCollection(name, function (err, collection) {
      if (err) return cb(err);
      collection.insert(data.collections[name], cb);
      return null;
    });
    return null;
  }, done);
  return null;
};