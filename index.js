const express = require('express');
// const logger = require("./src/utilities/middleware/logger");
const app = express();
const cors = require('cors');
const usersRouter = require('./src/api/user-routes');
const listings = require('./src/api/listing-routes');
const users = [
    {
        "id": "1",
        "name": "Byron",
        "role": "user",
        "email": "byron@mail.com",
        "password": "P@ssword"
      },
      {
        "id": "2",
        "name": "brett",
        "role": "service provider",
        "email": "brett@mail.com",
        "password": "P@ssword1"
      },
      {
        "id": "3",
        "name": "Riaz",
        "role": "user",
        "email": "riaz@mail.com",
        "password": "P@ssword2"
      },
    ]
app.use(cors());
//middleware handler

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
app.use(logger);

// var fs = require("fs");
// router.get("/api/users", (req, res) => {
//     //res.send('<h1>Hello World!</h1>');
//     fs.readFile("./src/data/data.json", function(err, data) {
//       if (err) throw err;
//       var parseData = JSON.parse(data);
//       res.json(parseData.users);
//     });
//   });

// app.get('/api/user', (req,res)=>{
//     res.json(users);
// });
// app.get("api/users/:id", (req, res) => {
//     fs.readFile("./src/data/data.json", function(err, data) {
//       if (err) throw err;
//       var parseData = JSON.parse(data);
//       const found = parseData.users.some(user => user.id === req.params.id);
//       if (found) {
//         res.json(users.filter(user => user.id === req.params.id));
//       } else {
//         res.status(400).json({ msg: "User not found" });
//       }
//     });
//   });
app.use('/api/user', usersRouter);
app.use('/api/auth', require('./src/api/auth-routes'));
app.use('/api/listings', listings);
app.use('/api/bookings', require('./src/api/booking-routes'));
app.use('/api/property', require('./src/property-routes'));
 //access enviroment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));