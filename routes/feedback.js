var express = require("express");
const FeedbackModel = require("../model/feedbackmodel");
var router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/userfb", function (req, res, next) {
  res.render("feedback/feedback");
});



router.post("/feedbackprocess", function (req, res, next) {

  var fdata = {
    name : req.body.name,
    mobile : req.body.mobile,
    email : req.body.email,
    message : req.body.message,
 };

  FeedbackModel.create(fdata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
         res.redirect('/feedback/userfb')

});

router.get('/disp', function (req, res, next) {
  FeedbackModel.find()
            .then(data=>{
                console.log(data);
                res.render('feedback/displayfeedback' , {fdata: data});
            })
    .catch((err) => console.log(err));
});



//delete code


router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  FeedbackModel.findByIdAndDelete(id)
  .then(data => {
    res.redirect('/feedback/disp')
  })
  .catch(err => console.error(err))
});














module.exports = router;