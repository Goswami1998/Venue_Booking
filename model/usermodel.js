const mongoose = require('mongoose');

//table structure

const mySchema = new mongoose.Schema({

   name : String,
   gender : String,
   mobile : Number,
   address : String,
   email : String,
   password : Number,


});

const UserModel = mongoose.model ('User', mySchema );

module.exports = UserModel;