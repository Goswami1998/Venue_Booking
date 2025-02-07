const mongoose = require('mongoose');

//table structure

const mySchema = new mongoose.Schema({


    name : String,
    email : String,
    address : String,
    mobile: Number,
    adminphoto: String,
    password : String,
    
});

const VendorModel = mongoose.model ('Vendor', mySchema );

module.exports = VendorModel;