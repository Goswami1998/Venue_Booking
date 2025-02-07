var express = require("express");
const CategoryModel = require("../model/categorymodel");

var router = express.Router();

router.get("/addcategory", function (req, res, next) {
  res.render("category/addcategory");
});

router.post("/process", function (req, res, next) {
  
  var filename = req.files.image.name;
  var cdata = {
    name: req.body.name,
    categorypic: filename,
  };

  var myfile = req.files.image;

  CategoryModel.create(cdata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));

  myfile.mv("public/upload/" + filename, function (err) {
    res.redirect("displaycategory");
  })
});

router.get("/displaycategory", function (req, res, next) {
  CategoryModel.find()
    .then((data) => {
      console.log(data);
      res.render("category/displaycategory", { cdata: data });
    })
    .catch((err) => console.log(err));
});

router.get("/displaycategory", function (req, res, next) {
  UserModel.find()
    .then((data) => {
      console.log(data);
      res.render("user/displayuser", { udata: data });
    })
    .catch((err) => console.log(err));
});


// delete category

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  CategoryModel.findByIdAndDelete(id)
  .then(data => {
    res.redirect('/category/displaycategory')
  })
  .catch(err => console.error(err))
});

module.exports = router;
