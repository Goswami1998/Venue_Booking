const mongoose = require('mongoose');

//table structure

const mySchema = new mongoose.Schema({

   title : String,
   detail : String,
   price : Number,
   category : String,
   venuepic : String,
    
});

const VenueModel = mongoose.model ('Venue', mySchema );

module.exports = VenueModel;