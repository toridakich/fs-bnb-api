
var mysqlConn = require("../database/database");
const status = {
    NEW: "new",
    ACCEPTED: "accepted",
    REJECTED: "rejected"
  };
//Task object constructor
var Booking = function(booking) {
  this.id = booking.id;
  this.dateFrom = booking.dateFrom;
  this.dateTo = booking.dateTo;
  this.userId = booking.userId;
  this.propertyId = booking.propertyId;
  this.status = status.NEW;
  
};


  Booking.createBooking = (newBooking, result) => {
    mysqlConn.query("INSERT INTO booking_requests set ?", newBooking, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res.insertId);
        result(null, res.insertId);
        }
    });
};

Booking.findAllBookings = function(result) {
    mysqlConn.query("Select * from booking_requests", function(err, res) {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        } else {
        console.log(res);
        result(null, res);
        }
    });
  };

  Booking.getBookingById = (bookingId, result) => {
    mysqlConn.query("Select * from user where id = ? ", bookingId, (err,res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

  Booking.getBookingByPropertyId = (propertyId, result) => {
    mysqlConn.query("Select * from booking_requests where propertyId = ? ", propertyId, (err,res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log('sdfdsf',res);
        result(null, res);
      }
    });
  };


Booking.updateStatus = (id, status, result) => {
  mysqlConn.query(
    "UPDATE booking_requests SET status = ? WHERE id = ?",
    [status, id],
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




module.exports = Booking;