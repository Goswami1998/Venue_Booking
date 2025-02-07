const mongoose = require('mongoose');

//table structure

const mySchema = new mongoose.Schema({

   name : String,
   email : String,
   phone : String,
   date : Date,
 
    
});

const BookingModel = mongoose.model ('Booking', mySchema );

module.exports = BookingModel;