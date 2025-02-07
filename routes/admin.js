var express = require("express");
const AdminModel = require("../model/m");
var router = express.Router();

router.get("/add", function (req, res, next) {
  res.render("admin/add");
});


/*router.get("/display", function (req, res, next) {
  res.render("admin/display");
});*/

router.post("/formprocess", function (req, res, next) {

  var filename = req.files.file123.name;
  
  var mydata = {

    name: req.body.name,
    email: req.body.email,
    address: req.body.txt,
    mobile: req.body.mobile,
    adminphoto : filename,
  };

  var myfiles = req.files.file123;

  AdminModel.create(mydata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
    myfile.mv("public/uoload/" + filename , function(err) {
      res.redirect('admin/display')
    })
}); 



router.get('/display', function (req, res, next) {
  AdminModel.find()
            .then(data=>{
                console.log(data);
                res.render('admin/display' , {mydata: data});
            })
    .catch((err) => console.log(err));
});







router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  AdminModel.findByIdAndDelete(id)
  .then(data => {
    res.redirect('/admin/display')
  })
  .catch(err => console.error(err))
});

module.exports = router;
