var express = require("express");

const VenueModel = require("../model/venuemodel");
var router = express.Router();

router.get("/add", function (req, res, next) {
  res.render("venue/addvenue");
});
/*router.get("/display", function (req, res, next) {
  res.render("admin/display");
});*/

router.post("/venueprocess", function (req, res, next) {
  var filename = req.files.image.name;
 
  var vdata = {

    title : req.body.title,
    detail : req.body.details,
    price : req.body.price,
    category : req.body.category,
    venuepic : filename
  };

  var myfile= req.files.image;

  VenueModel.create(vdata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
 
   myfile.mv("public/upload/" + filename, function (err) {
    res.redirect('/venue/display') 
  })

});



router.get('/display', function (req, res, next) {
  VenueModel.find()
            .then(data=>{
                console.log(data);
                res.render('venue/displayvenue' , {vdata: data});
            })
    .catch((err) => console.log(err));
});


//delete process


router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  VenueModel.findByIdAndDelete(id)
  .then(data => {
    res.redirect('/venue/display')
  })
  .catch(err => console.error(err))
});


router.get("/edit/:id", function (req, res) {
  console.log(req.params.id);
  VenueModel.findById(req.params.id).then(function (db_users_array) {
   // console.log(db_users_array);
    res.render("venue/edit", { vdata: db_users_array });
  });
});


//Edit Processing code


router.post("/edit/:id", function (req, res) {
  console.log("Edit  ID is " + req.params.id);

  var vdata = {

    title : req.body.title,
    detail : req.body.details,
    price : req.body.price,
    category : req.body.category,
   
  };
  

  VenueModel.findByIdAndUpdate(req.params.id, vdata).then(function (db_users_array) {
    console.log(db_users_array);
    res.redirect('/venue/display');
    
  });
});







module.exports = router;
