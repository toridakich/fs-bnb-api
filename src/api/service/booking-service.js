var fs = require("fs");
var jwt = require('jsonwebtoken');
const Booking = require('../models/booking-model');



module.exports = class BookService {
  constructor() {}
  async hashPassword(password){
    var salt = bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  createNewBooking(booking){
      return new Promise((resolve, reject) =>{
        const bookingObj = {
            id: booking.id,
            dateFrom: booking.dateFrom,
            dateTo: booking.dateTo,
            userId: booking.userId,
            propertyId: booking.propertyId,
            status: booking.status
        };

        const newBooking = new Booking(bookingObj);

        Booking.createBooking(newBooking, (err, res) =>{
            if (err) reject(err);
            resolve(res);
        });
      });
  }

  getAllBookings(){
    return new Promise((resolve, reject) => {
        var found = false;
        Booking.findAllBookings((err, dbUsers) =>{
          if(err) reject(err);
          resolve(dbUsers);
  })})}

  listAllBookings(propertyId){
    console.log(propertyId);
    return new Promise((resolve, reject) => {
        
    Booking.getBookingByPropertyId(propertyId.propertyId, (err, res) => {
        if(err) reject(err);
        console.log(res)
        // dbBookings.forEach(element => {
        //     console.log(element);
        // });
        // resolve(dbBookings);
        
        let dbBooking = res.filter(dbBooking =>{
            return dbBooking.propertyId == propertyId.propertyId;
        });
        console.log(dbBooking)
        if(dbBooking.length >= 1){
            resolve(dbBooking)
        }
        else{
            reject("No booking requests")
        }
    });
});
  }
  updateBookingStatus(id, body){
      console.log(id);
    return new Promise((resolve, reject) =>{
        
            
                Booking.updateStatus(id, body.status, (err, res)=>{
                    if(err){
                        reject(err);
                    } else{
                        resolve(res);
                    }
                });
            }
    );
    
  }

    
  async getJwtToken(user, rememberUser){
      let jwtObject = {};

      jwtObject.id = user.id;
      jwtObject.firstName = user.firstName;
      jwtObject.lastName = user.lastName;
  }
};