const express = require('express');
const router = express.Router();

const BookService = require('./service/booking-service');

router.post("/createNewBooking", (req, res) => {
    BookService.prototype.createNewBooking(req.body)
    .then(booking =>{
        res.sendStatus(booking);
    })
    .catch(err =>{
        res.status(400).send(err);
    });
});

router.get("/listAllBookings", (req, res) => {
    BookService.prototype.listAllBookings(req.body.id)
    .then(bookings =>{
        res.send(bookings);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
});

router.get('/', (req,res)=>{
    BookService.prototype.getAllBookings().then(user=>{
      res.send(user);
    }).catch(err=>{
      res.send(err);
    })
  })

router.patch("/updateBookingStatus", (req, res) =>{

    BookService.prototype.updateBookingStatusToAccepted(req.query.id, req.body)
    .then(bookings =>{
        res.send(bookings);
    })
    .catch(err =>{
        res.status(400).send(err);
    });
});


module.exports = router;