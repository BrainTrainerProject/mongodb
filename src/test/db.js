import index from '../index';

const json2mongo = require('json2mongo');
const async = require('async');

const connection = index.connection;
const state = {
  db: null,
};

const uri = 'mongodb://127.0.0.1:27017/mongodbtest';

exports.connect = (done) => {
  if (state.db) return done();

  index.connect(uri, (err) => {
    if (err) return done(err);
    state.db = connection.db;
    done();
    return null;
  });
  return null;
};

exports.disconnect = (done) => {
  index.disconnect();
  done();
};

exports.getDB = () => state.db;


exports.dropAndLoad = (data, done) => {
  async.waterfall([
    (next) => {
      const db = state.db;
      if (!db) {
        console.log('Datenbankverbindung fehlt!');
        return null;
      }
      db.collections((err, collections) => {
        if (err) console.log(err);
        async.each(collections, (collection, cb) => {
          if (collection.collectionName.indexOf('system') === 0) {
            // console.log('drop collectionName system');
            return cb();
          }
          // console.log('Removing collection: ', collection.name);
          collection.remove({});
          return null;
        });
      });
      next(null);
      return null;
    },
    (next) => {
      const db = state.db;
      if (!db) {
        console.log('Datenbankverbindung fehlt!');
        return null;
      }
      const jsonmongo = json2mongo(data);
      const names = Object.keys(jsonmongo.collections);
      async.eachSeries(names, (name, cb) => {
        db.createCollection(name, (err, collection) => {
          if (err) return cb(err);
          collection.insert(jsonmongo.collections[name], cb);
          return null;
        });
        return null;
      });
      next(null);
      return null;
    },
  ], done);
  return null;
};
