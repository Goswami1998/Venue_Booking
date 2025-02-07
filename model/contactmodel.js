const mongoose = require('mongoose');

//table structure

const contactSchema = new mongoose.Schema({

    name : String,
    phone : Number,
    email : String,
    message: String,


});

const ContactModel = mongoose.model ('contact', contactSchema );
module.exports = ContactModel;