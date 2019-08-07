
const fs = require('fs');
var mysqlConn = require("../database/database");

const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
};
//Task object constructor
var Provider = function(provider) {
  this.firstName = provider.firstName;
  this.lastName = provider.lastName;
  this.cellPhone = provider.cellPhone;
  this.email = provider.email;
  this.password = provider.password;
  this.role = "provider"
  // this.date_created = new Date();
};


  Provider.createProvider = (newUser, result) => {
    mysqlConn.query("INSERT INTO providers set ?", newUser, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res.insertId);
        result(null, res.insertId);
        }
    });
};

Provider.findAllProviders = function(result) {
  mysqlConn.query("Select * from providers", function(err, res) {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      } else {
      console.log(res);
      result(null, res);
      }
  });
};

Provider.findProviderByName = (userName, result) => {
  mysqlConn.query("Select * from providers where name = ?", userName, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      } else {
      console.log(res);
      result(null, res);
      }
  });
};


Provider.getProviderById = (userId, result) => {
  mysqlConn.query("Select * from providers where id = ? ", userId, (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Provider.updateProviderById = (userId, user, result) => {
  mysqlConn.query(
    "UPDATE providers SET providers = ? WHERE id = ?",
    [user, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Provider.removeProvider = (userId, result) => {
  mysqlConn.query("DELETE FROM providers WHERE id = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Provider;