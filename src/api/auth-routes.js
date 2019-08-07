const express = require('express');
const router = express.Router();
const authService = require('../api/service/auth-service');


const User = require('./models/user-model');
// router.post('/login',(req,res)=>{
//     // get user
    
//     // loop through users
//     // validate email
//     // validate password

//     //return success/fail
//     const authUser = req.body;
//     User.prototype.getUsers().then(users=>{
//         const dbUser = users.filter(user=>{
//             return user.email == authUser.email;
//         });

//         if(dbUser){
//             if(dbUser[0].password == authUser.password){
//                 res.send(dbUser[0]);
//             }else{
//                 res.status(400).send("incorrect password");
//             }
//         }else{
//             res.status(400).send("user not found");
//         }
//     }).catch(err=>{
//         res.status(400).send(err);
//     });
        
    

// });
router.post("/userRegister", (req, res) => {
    authService.prototype
      .userRegister(req.body)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(400).json({ msg: err.message });
      });
  });
  router.get('/', (req,res)=>{
    authService.prototype.findAllUsers().then(user=>{
      res.send(user);
    }).catch(err=>{
      res.send(err);
    })
  })


  router.post('/getUserByID', (req,res)=>{
    authService.prototype
      .getUserByID(req.body)
      .then(provider => {
        res.send(provider);
      })
      .catch(err => {
        res.status(400).send(err.message);
      });
  })

  router.post('/getProviderByID', (req,res)=>{
    authService.prototype
      .getProviderByID(req.body)
      .then(provider => {
        res.send(provider);
      })
      .catch(err => {
        res.status(400).send(err.message);
      });
  })


  router.post("/userLogin", (req, res) => {
    authService.prototype.userLogin(req.body)
      .then(user => {
        // res.status(200).json(user);
        res.send(user);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  //   User.
  //  findAllUsers()
  //  .then(users => {
  //    const dbUser = users.filter(user => {
  //      return user.email == authUser.email;
  //    });

  //    if (dbUser) {
  //      if (dbUser[0].password == authUser.password) {
  //        res.send(dbUser[0]);
  //      } else {
  //        res.status(400).send("incorrect password");
  //      }
  //    } else {
  //      res.status(400).send("user not found");
  //    }
  //  })
  //  .catch(err => {
  //    res.status(400).send(err);
  //  });
  });

  router.post("/providerRegister", (req, res) => {
    authService.prototype
      .providerRegister(req.body)
      .then(provider => {
        res.json(provider);
      })
      .catch(err => {
        res.status(400).json({ msg: err.message });
      });
  });

  router.post("/providerLogin", (req, res) => {
    authService.prototype.providerLogin(req.body)
      .then(provider => {
        // res.status(200).json(user);
        res.send(provider);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  //   User.
  //  findAllUsers()
  //  .then(users => {
  //    const dbUser = users.filter(user => {
  //      return user.email == authUser.email;
  //    });

  //    if (dbUser) {
  //      if (dbUser[0].password == authUser.password) {
  //        res.send(dbUser[0]);
  //      } else {
  //        res.status(400).send("incorrect password");
  //      }
  //    } else {
  //      res.status(400).send("user not found");
  //    }
  //  })
  //  .catch(err => {
  //    res.status(400).send(err);
  //  });
  });
module.exports = router;