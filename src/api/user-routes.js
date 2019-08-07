const express = require('express');

const router = express.Router();

const UserService = require("../api/service/user-service");
const userServer = new UserService();

router.get('/', function(req,res){
    
    userServer.findUsers().then(users=>{
        res.json(users);
    })
    .catch(err=>{
        res.status(400).send(err);
    });
    
});

// router.post('/', function(req,res){
    
//     User.createUsers(req.body).then(users=>{
//         res.send(user);
//     })
//     .catch(err=>{
//         res.status(400).send(err);
//     });
// });

router.post("/", (req, res) => {
    const user = req.body;
    fs.readFile("./src/data/data.json", function(err, data) {
      var error = false;
      var errMsg = "";
      if (err) {
        error = true;
        throw err;
      } else {
        var count = 0;
  
        if (data.length > 0) {
          var parseData = JSON.parse(data);
          parseData.users.forEach(existingUser => {
            if (existingUser.email === user.email) {
              throw new Error("This email address already been used");
            }
            count++;
          });
        } else {
          parseData = {
            users: []
          };
        }
  
        const newUser = {
          id: (count + 1).toString(),
          name: user.name,
          surname: user.surname,
          cellPhone: user.cellPhone,
          email: user.email,
          password: user.password,
          role: user.role
        };
  
        parseData.users.push(newUser);
        fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
          err
        ) {
          if (err) {
            error = true;
            throw err;
          }
          res.json(newUser);
        });
      }
  
      if (error) {
        res.status(400).json({ msg: errMsg });
      } else {
        res.json(user);
      }
    });
  });
  router.post("/update", (req, res) => {
    const user = req.body;
    fs.readFile("./src/data/data.json", function(err, data) {
      var error = false;
      if (err) {
        error = true;
        throw err;
      } else {
        if (data.length > 0) {
          var parseData = JSON.parse(data);
        } else {
          throw Error("No Users");
        }
  
        parseData.users = parseData.users.filter(existingUser => {
          return existingUser.email !== user.email;
        });
  
        const updateUser = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          cellPhone: user.cellPhone,
          email: user.email,
          password: user.password,
          role: user.role
        };
  
        parseData.users.push(updateUser);
        fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
          err
        ) {
          if (err) {
            error = true;
            throw err;
          }
          res.json(updateUser);
        });
      }
  
      if (error) {
        res.status(400).json({ msg: err.msg });
      } else {
        res.json(user);
      }
    });
  });

  router.get("/delete/:id", (req, res) => {
    fs.readFile("./src/data/data.json", function(err, data) {
      var error = false;
      if (err) {
        error = true;
        throw err;
      }
      var parseData = JSON.parse(data);
      parseData.users = parseData.users.filter(user => user.id === req.params.id);
      fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(
        err
      ) {
        if (err) {
          error = true;
          throw err;
        }
        res.json({ status: "User deleted" });
      });
      if (error) {
        res.status(400).json({ msg: err.message });
      } else {
        res.json({ status: "User deleted" });
      }
    });
  });


module.exports = router;