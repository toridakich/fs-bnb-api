var User = require("../models/user-model");

module.exports = class UserService {
  constructor() {}

  findUsers()
  {        
    // return promise (asynchronous function method)
    // https://developers.google.com/web/fundamentals/primers/promises
    return new Promise((resolve, reject) => {        
      User.findAllUsers((err, res) => {
        if (err) {
        reject(err);
        }
        console.log()
        resolve(res);
      });
    });
  }


  createUser(userReq) {
    // return promise (asynchronous function method)
    // https://developers.google.com/web/fundamentals/primers/promises
    return new Promise((resolve, reject) => {
      User.findUserByName(userReq.name, (err, res) => { // check if user exists
        if (err) {
          reject(err);
        }
        if (res.length < 1) { // create user
          User.createUser(userReq, (err, res) => {
            if (err) {
              reject(err);
            } else{
            resolve(res);
            }
          });
        }
        else {
          reject("user already exists");
        }
      })
    });
  }
}