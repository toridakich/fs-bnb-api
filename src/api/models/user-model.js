// const users=[
//     {
//         "id": "1",
//         "name": "Byron",
//         "role": "user",
//         "email": "byron@mail.com",
//         "password": "P@ssword"
//       },
//       {
//         "id": "2",
//         "name": "brett",
//         "role": "service provider",
//         "email": "brett@mail.com",
//         "password": "P@ssword1"
//       },
//       {
//         "id": "3",
//         "name": "Riaz",
//         "role": "user",
//         "email": "riaz@mail.com",
//         "password": "P@ssword2"
//       }
// ];
const fs = require('fs');
var mysqlConn = require("../database/database");

const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
};
//Task object constructor
var User = function(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.cellPhone = user.cellPhone;
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
  // this.date_created = new Date();
};

// module.exports = class User2{
  
//   constructor(newId, newName, newEmail, newPassword){
//     this.name = newName;
//     this.id = newId;
//     this.email = newEmail;
//     this.password = newPassword;
//     this.role = roles.USER;
    
//   }
  // getUsers(){
  //   return new Promise((resolve, reject) =>{
  //     fs.readFile("./src/api/data/data.json", (err,data)=>{
  //       if(err){
  //         reject(err);
  //       }else{
  //         resolve(data);
  //       }
  //     })
  //   })
  // }     
  // createUsers(AuthUser){
  //   return new Promise((resolve,reject) =>{
  //     fs.readFile('./src/data/data.json', (err,data) =>{
  //       if(err){
  //         reject(err)
  //       }else{
  //         let users = JSON.parse(data).users;
  //         users.push(AuthUser);
  //         dataObject = {
  //           users: users
  //         };
  //         let userJSON = JSON.stringify(users);
  //         fs.writeFile("./src/data/data.json", userJSON,err =>{
  //             if(err){
  //               reject(err);
  //             }else{
  //               resolve(users);
  //             }
  //         });
  //       }
  //     });
  //   });
  // }
  User.createUser = (newUser, result) => {
    mysqlConn.query("INSERT INTO user set ?", newUser, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res.insertId);
        result(null, res.insertId);
        }
    });
};
User.findAllUsers = function(result) {
  
  mysqlConn.query("SELECT * FROM user", function(err, res) {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      } else {
      result(null, res);
      }
  });
};

User.findUserByName = (userName, result) => {
  mysqlConn.query("Select * from user where name = ?", userName, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      } else {
      console.log(res);
      result(null, res);
      }
  });
};

User.getUserById = (userId, result) => {
  mysqlConn.query("Select * from user where id = ? ", userId, (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.updateUserById = (userId, user, result) => {
  mysqlConn.query(
    "UPDATE user SET user = ? WHERE id = ?",
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

User.removeUser = (userId, result) => {
  mysqlConn.query("DELETE FROM user WHERE id = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
