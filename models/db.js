const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, MONGO_DB_NAME } = require('../config/db.config');

const state = {
  db: null
};

exports.connect = (done) => {
  if (state.db) return done();

  MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return done(err);

    let dbName = MONGO_DB_NAME;

    state.db = client.db(dbName);
    done();
  });
};

exports.getInstance = () => {
  return state.db;
};

exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};