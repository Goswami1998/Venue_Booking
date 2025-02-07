const express = require("express");
const VendorModel = require("../model/vendor");
const FeedbackModel = require("../model/feedbackmodel");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("vendor", { title: "Express" });
});
// router.get("/vd", function (req, res, next) {
//   res.render("vendor/vendordashboard", { title: "Express" });
// });

//Login Route
router.get("/vlogin", function (req, res, next) {
  res.render("vendor/login", { title: "Express" });
});

// Login Route Processing

router.post("/vlogin", function (req, res, next) {
  var email = req.body.u_name;
  console.log(email);
  var password = req.body.u_pass;
  console.log(password);

  VendorModel.findOne({ email: email }).then(function (db_users_array) {
    console.log(db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.email;
      console.log(db_email);

      var db_password = db_users_array.password;
      console.log(db_password);
    }
    if (db_email == null) {
      res.end("Email not found!!!");
    } else if (db_email == email && db_password == password) {
      console.log("sucess");
      req.session.email1 = db_email;
      res.redirect("/vendor/vd");
    } else {
      res.redirect("/vendor/vlogin");
    }
  });
});

//Dashboard Redirect if and only if login

// router.get("/vd", function (req, res, next) {
//     if (!req.session.email1) {
//       console.log("Email Session is Set");
//       res.end(
//         "Login required to Access this page , please Go to Login Page And After Access This Page"
//       );
//     }

//     res.render("vendor/vendordashboard", { email: req.session.email1 });
//   });

//Signup Route
router.get("/vsignup", function (req, res, next) {
  res.render("vendor/signup", { title: "Express" });
});
router.get("/vd", function (req, res, next) {
  res.render("vendor/vendordashboard", { title: "Express" });
});

//Signup Processing
router.post("/vsignup", function (req, res, next) {
  const vendor_signup = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(vendor_signup);

  VendorModel.create(vendor_signup)
    .then(() => console.log("Signed Up Success"))
    .catch((err) => console.log(err));
  res.redirect("../vendor/vlogin");
});

//changepassword

router.get("/vchange", function (req, res, next) {
  if (!req.session.email1) {
    console.log("Email Session is Set");
    res.redirect("/vlogin");
  }
  res.render("vendor/changepassword");
});

//Change Password Processing

router.post("/vchange", function (req, res, next) {
  if (!req.session.email1) {
    console.log("Email Session is Set");
    res.redirect("login");
  }
  console.log("Home Called " + req.session.email1);

  var myemail = req.session.email1;
  console.log(myemail);
  var opass = req.body.opass;
  console.log(opass);
  var npass = req.body.npass;
  console.log(npass);
  var c_pass = req.body.c_pass;
  console.log(c_pass);

  VendorModel.findOne({ email: myemail }).then(function (db_users_array) {
    console.log(db_users_array);
    console.log(db_users_array.password);

    if (opass == db_users_array.password) {
      if (opass == npass) {
        res.end(" New password  must be different then  old password");
      } else {
        if (npass == c_pass) {
          VendorModel.findOneAndUpdate(
            { email: myemail },
            { $set: { password: npass } }
          ).then(function () {
            res.redirect("/vendor/vlogin");
          });
        } else {
          res.end("New password and confirm password must be same");
        }
      }
    } else {
      res.end("Old password is wrong");
    }
  });
});

//table
router.get("/vtable", function (req, res, next) {
  res.render("vendor/vendortable", { title: "Express" });
});

//Forgot Password

router.get("/fs", function (req, res, next) {
  res.render("vendor/forgotpassword");
});

//Forgot password method called

router.post("/forgotpassword", function (req, res, next) {
  var email = req.body.email;
  console.log(email);

  VendorModel.findOne({ email: email }).then(function (db_users_array) {
    console.log("Find one" + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.email;
      console.log(db_email);
      var db_pass = db_users_array.password;
      console.log(db_pass);
    }

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    } else if (db_email == email) {
      const nodemailer = require("nodemailer");

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "joshivinayak8784@gmail.com",
          pass: "xgal luvo akrs ajyu",
        },
      });

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: " <joshivinayak8784@gmail.com>", // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "hello your password is  " + db_pass, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
    }
  });
  res.redirect("/vendor/vlogin");
});

// router.get("/displayfeedback", function (req, res, next) {
//   res.render("vendor/displayfeedback");
// });





router.get('/disp', function (req, res, next) {
  FeedbackModel.find()
            .then(data=>{
                console.log(data);
                res.render('vendor/displayfeedback' , {fdata: data});
            })
    .catch((err) => console.log(err));
});



module.exports = router;
