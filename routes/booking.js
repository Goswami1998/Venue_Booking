var express = require("express");
const BookingModel = require("../model/bookingmodel");

var router = express.Router();

router.get("/add", function (req, res, next) {
  res.render("booking/addbooking");
});


router.post("/bookingprocess", function (req, res, next) {
  
  var bdata = {

    name : req.body.name,
    email : req.body.email,
    phone : req.body.phone,
    date : req.body.date,

  };

  BookingModel.create(bdata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
  res.redirect('/booking/display')
});



router.get('/display', function (req, res, next) {
  BookingModel.find()
            .then(data=>{
                console.log(data);
                res.render('booking/displaybooking' , {bdata: data});
            })
    .catch((err) => console.log(err));
});

module.exports = router;
