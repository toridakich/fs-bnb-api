//const users = require("../utilities/models/users");
var fs = require("fs");
var jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const Provider = require('../models/provider-model');
const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
};

module.exports = class AuthService {
  constructor() {}
  async hashPassword(password){
    var salt = bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  userRegister(user) {
    // return new Promise((resolve, reject) => {
      
    //   User.createUser((err, dbUsers) =>{
    //     if(err) reject(err);
    //     let dbUser = dbUsers.filter(dbUser =>{
    //       return dbUser.email == user.email;
    //     });
    //     if(dbUser.length){
    //       if(dbUser[0].password != user.password){
    //         reject("Incorrect password");
    //       } else{
    //         resolve(dbUser[0]);
    //       }
    //     }else{
    //       reject("User not found");
    //     }
    //   });
    return new Promise((resolve, reject) => {

      // fs.readFile("./src/data/data.json", function(err, data) {
        User.findAllUsers((err, dbUsers) =>{
          if(err) reject(err);
          let dbUser = dbUsers.filter(dbUser =>{
            if (dbUser.email == user.email){
              reject("This email address has already been used");
            }
          });
        // if (err) reject(err);
        // var parseData = JSON.parse(data);
        // var parseData = data;

        // var count = 0;
        // // parseData.users.forEach(existingUser => {
        //   parseData.forEach(existingUser =>{
        //   if (existingUser.email === user.email) {
        //     reject("This email address already been used");
        //   }
        //   count++;
        // });
        // const passwordHash = this.hashPassword(user.password);
        
        const userObj = {
          firstName: user.firstName,
          lastName: user.lastName,
          cellPhone: user.cellPhone,
          email: user.email,
          password: user.password,
          role: roles.USER
        };


        const newUser = new User(userObj);
        
        // parseData.users.push(newUser);

        // fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
        User.createUser(newUser, (err, res) =>{
          if (err) reject(err);
          resolve(res);
        });
      });

    });
  // });
  }

  userLogin(user) {
    return new Promise((resolve, reject) => {
      var found = false;
      User.findAllUsers((err, dbUsers) =>{
        if(err) reject(err);
        let dbUser = dbUsers.filter(dbUser =>{
          return dbUser.email == user.email;
        });
        if(dbUser.length){
          if(dbUser[0].password != user.password){
            reject("Incorrect password");
          } 
          else {
            resolve(dbUser[0]);
          }
        }else{
          reject("User not found");
        }
      });
      // .then(users=>{
      //   users.forEach(user =>{
      //     if(user.email == )
      //   })
      // }
    
      // var found = false;
      // fs.readFile("./src/data/data.json", function(err, data) {
      //   if (err) reject(err);
      //   console.log(data);
      //   var parseData = JSON.parse(data);
      //   parseData.users.forEach(existingUser => {
      //     if (existingUser.email === user.email) {
      //       found = true;
      //     }
      //     if (found) {
      //       const match = bcrypt.compare(existingUser.password, user.password)
      //       if (!match) {
      //         reject("Incorrect password");
      //       } else {
      //         resolve(user);
      //       }
      //     } else {
      //       reject("User not found");
      //     }
      //   });
      // });
    });
  }
  // getUserByID(userId) {
  //   return new Promise((resolve, reject) => {
  //     var found = false;
  //     User.getUserById((err, dbUsers) =>{
  //       if(err) reject(err);
  //       let dbUser = dbUsers.filter(dbUser =>{
  //         return dbUser.id == userId;
  //       });
  //       if(dbUser.length){
          
        
  //           resolve(dbUser[0]);
          
  //       }else{
  //         reject("User not found");
  //       }
  //     });
  //   });
  // }
  getUserByID(user) {
    return new Promise((resolve, reject) => {
      var found = false;
      User.findAllUsers((err, dbUsers) =>{
        if(err) reject(err);
        let dbUser = dbUsers.filter(dbUser =>{
          return dbUser.id == user.id;
        });
        if(dbUser.length){
          
            resolve(dbUser[0]);
          
        }else{
          reject("User not found");
        }
      });
     
    });
  }
  findAllUsers() {
    return new Promise((resolve, reject) => {
      var found = false;
      User.findAllUsers((err, dbUsers) =>{
        if(err) reject(err);
        resolve(dbUsers);
  
            
          
        
     
    });
  })}
  getProviderByID(user) {
    return new Promise((resolve, reject) => {
      var found = false;
      Provider.findAllProviders((err, dbUsers) =>{
        if(err) reject(err);
        let dbUser = dbUsers.filter(dbUser =>{
          return dbUser.id == user.id;
        });
        if(dbUser.length){
          
            resolve(dbUser[0]);
          
        }else{
          reject("User not found");
        }
      });
      
      // .then(users=>{
      //   users.forEach(user =>{
      //     if(user.email == )
      //   })
      // }
    
      // var found = false;
      // fs.readFile("./src/data/data.json", function(err, data) {
      //   if (err) reject(err);
      //   console.log(data);
      //   var parseData = JSON.parse(data);
      //   parseData.users.forEach(existingUser => {
      //     if (existingUser.email === user.email) {
      //       found = true;
      //     }
      //     if (found) {
      //       const match = bcrypt.compare(existingUser.password, user.password)
      //       if (!match) {
      //         reject("Incorrect password");
      //       } else {
      //         resolve(user);
      //       }
      //     } else {
      //       reject("User not found");
      //     }
      //   });
      // });
    });
  }
  providerRegister(provider) {
    
    return new Promise((resolve, reject) => {

      
        Provider.findAllProviders((err, dbProviders) =>{
          if(err) reject(err);
          let dbProvider = dbProviders.filter(dbProvider =>{
            if (dbProvider.email == provider.email){
              reject("This email address has already been used");
            }
          });
        
        
        const providerObj = {
          firstName: provider.firstName,
          lastName: provider.lastName,
          cellPhone: provider.cellPhone,
          email: provider.email,
          password: provider.password,
          role: roles.PROVIDER
        };


        const newProvider = new Provider(providerObj);
        
        Provider.createProvider(newProvider, (err, res) =>{
          if (err) reject(err);
          resolve(res);
        });
      });

    });
  
  }
  providerLogin(provider) {
    return new Promise((resolve, reject) => {
      var found = false;
      Provider.findAllProviders((err, dbProviders) =>{
        if(err) reject(err);
        let dbProvider = dbProviders.filter(dbProvider =>{
          return dbProvider.email == provider.email;
        });
        if(dbProvider.length){
          if(dbProvider[0].password != provider.password){
            reject("Incorrect password");
          } 
          else {
            resolve(dbProvider[0]);
          }
        }else{
          reject("Provider not found");
        }
      });
    });
  }
    
  async getJwtToken(user, rememberUser){
      let jwtObject = {};

      jwtObject.id = user.id;
      jwtObject.firstName = user.firstName;
      jwtObject.lastName = user.lastName;
  }
};

