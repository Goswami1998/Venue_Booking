var express = require("express");
const UserModel = require("../model/usermodel");
var router = express.Router();

router.get("/add", function (req, res, next) {
  res.render("user/adduser");
});


router.post("/userprocess", function (req, res, next) {

  var udata = {
    name : req.body.name,
    gender : req.body.gender,
    mobile : req.body.mobile,
    address : req.body.address,
    email : req.body.email,
    password : req.body.password,

 };

  UserModel.create(udata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
         res.redirect('display')

});


//userside data

router.post("/registerprocess", function (req, res, next) {

  var udata = {
    name : req.body.name,
    gender : req.body.gender,
    mobile : req.body.mobile,
    address : req.body.address,
    email : req.body.email,
    password : req.body.password,
 };

  UserModel.create(udata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
         res.redirect('/userside')

});



router.get('/display', function (req, res, next) {
  UserModel.find()
            .then(data=>{
                console.log(data);
                res.render('user/displayuser' , {udata: data});
            })
    .catch((err) => console.log(err));
});



//delete user

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  UserModel.findByIdAndDelete(id)
  .then(data => {
    res.redirect('/user/display')
  })
  .catch(err => console.error(err))
});





module.exports = router;
