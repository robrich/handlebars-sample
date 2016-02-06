'use strict';

/*
a poor man's in-memory database
*/

var _ = require('lodash');

var database = [];

function getAll(cb) {
  cb(null, database);
}

function getById(id, cb) {
  var obj = _.find(database, {id: id});
  cb(null, obj);
}

function add(obj, cb) {
  var id = 0;

  // get one bigger than the last id
  if (database.length) {
    // FRAGILE: this is a really inefficient way to do this
    id = database.map(function (row) {
      return row.id;
    }).sort().reverse()[0];
  }
  id++;

  obj.id = id;
  database.push(obj);
  cb(null, obj);
}

function update(obj, cb) {
  // filter out the current object so the new object can replace it
  var db = database.filter(function (row) {
    return row.id !== obj.id;
  });
  db.push(obj);
  database = db;
  cb(null, obj);
}

module.exports = {
  getAll: getAll,
  getById: getById,
  add: add,
  update: update
};
