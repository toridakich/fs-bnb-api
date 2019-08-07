'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable("prove", {
    id: {type:"int", length:6, primaryKey: true, autoIncrement: true},
    name: {type: "string", length: 50},
    email: {type: "string", length: 50},
    address: {type: "string", length: 50}
  }),
  callback();
};

exports.down = function(db) {
  db.dropTable("prove");
  callback();
};

exports._meta = {
  "version": 1
};
