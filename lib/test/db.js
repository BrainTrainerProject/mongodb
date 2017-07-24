'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var json2mongo = require('json2mongo');
var async = require('async');

var connection = _index2.default.connection;
var state = {
  db: null
};
var jsonmongo = null;
var names = null;

var uri = 'mongodb://127.0.0.1:27017/mongodbtest';

exports.connect = function (done) {
  if (state.db) return done();

  _index2.default.connect(uri, function (err) {
    if (err) return done(err);
    state.db = connection.db;
    done();
    return null;
  });
  return null;
};

exports.disconnect = function (done) {
  _index2.default.disconnect();
  done();
};

exports.getDB = function () {
  return state.db;
};

exports.dropAndLoad = function (data, done) {
  var db = state.db;
  if (!db) {
    console.log('Datenbankverbindung fehlt!');
    return null;
  }
  jsonmongo = json2mongo(data);
  names = Object.keys(jsonmongo.collections);
  async.waterfall([function (next) {
    db.collections(function (err, collections) {
      async.each(collections, function (collection, cb) {
        if (collection.collectionName.indexOf('system') === 0) {
          console.log('drop collectionName system');
          return cb();
        }
        // console.log('Removing collection: ', collection.name);
        collection.remove({});
        return null;
      });
    });
    next();
    return null;
  }, function (next) {
    async.each(names, function (name, cb) {
      db.createCollection(name, function (err, collection) {
        if (err) return cb(err);
        collection.insert(jsonmongo.collections[name], cb);
        return null;
      });
      return null;
    });
    next();
    return null;
  }], done);
  return null;
};

exports.fixtures = function (data, done) {
  var db = state.db;
  if (!db) {
    return done(new Error('Missing database connection'));
  }
  jsonmongo = json2mongo(data);
  names = Object.keys(jsonmongo.collections);
  async.each(names, function (name, cb) {
    db.createCollection(name, function (err, collection) {
      if (err) return cb(err);
      collection.insert(jsonmongo.collections[name], cb);
      return null;
    });
    return null;
  }, done);
  return null;
};