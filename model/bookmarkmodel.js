const mongoose = require('mongoose');

//table structure

const bookmarksSchema = new mongoose.Schema({

    venueId : Number,
    venueName : String,
    venuepic : String,
    venueprice : Number,

 

});

const BookmarksModel = mongoose.model ('Bookmarks', bookmarksSchema );
module.exports = BookmarksModel;