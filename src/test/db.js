const dbClient = require('mongodb').MongoClient;
const async = require('async');

const state = {
  db: null,
};

const uri = 'mongodb://127.0.0.1:27017/mongodbtest';

exports.connect = (done) => {
  if (state.db) return done();

  dbClient.connect(uri, (err, db) => {
    if (err) return done(err);
    state.db = db;
    done();
    return null;
  });
  return null;
};

exports.getDB = () => state.db;


exports.drop = (done) => {
  const db = state.db;
  if (!db) {
    console.log('drop !db');
    return done();
  }
  db.collections((err, collections) => {
    async.each(collections, (collection, cb) => {
      if (collection.collectionName.indexOf('system') === 0) {
        console.log('drop collectionName system');
        return cb();
      }
      // console.log('Removing collection: ', collection.name);
      collection.remove({});
      return null;
    }, done);
  });
  return null;
};

exports.fixtures = (data, done) => {
  const db = state.db;
  if (!db) {
    return done(new Error('Missing database connection'));
  }
  const names = Object.keys(data.collections);
  async.each(names, (name, cb) => {
    db.createCollection(name, (err, collection) => {
      if (err) return cb(err);
      collection.insert(data.collections[name], cb);
      return null;
    });
    return null;
  }, done);
  console.log('fixtures shoud be loaded');
  return null;
};
