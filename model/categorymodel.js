const mongoose = require('mongoose');

//table structure

const mySchema = new mongoose.Schema({

    name : String,
    categorypic : String,

    
});

const CategoryModel = mongoose.model ('Category', mySchema );

module.exports = CategoryModel;