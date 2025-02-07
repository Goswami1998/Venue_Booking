const mongoose = require('mongoose');

//table structure

const mySchema = new mongoose.Schema({

   name : String,
   mobile : String,
   email : String,
   message: String,
    
});

const FeedbackModel = mongoose.model ('Feedback', mySchema );

module.exports = FeedbackModel;