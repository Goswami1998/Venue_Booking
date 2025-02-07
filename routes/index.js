var express = require("express");
const AdminModel = require("../model/m");
const VenueModel = require("../model/venuemodel");
const BookingModel = require("../model/bookingmodel");
const UserModel = require("../model/usermodel");
const ContactModel = require("../model/contactmodel");
const BookmarksModel = require("../model/bookmarkmodel");
var router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/userside", function (req, res, next) {
  res.render("userside/userside", { title: "Express" });
});



router.get("/menu", function (req, res, next) {
 
  VenueModel.find()
  .then(data=>{
      console.log(data);
      res.render('userside/venue' , {vdata: data});
  })
.catch((err) => console.log(err));

});

router.get('/show/:id', function (req, res) {
  console.log(req.params.id);
  VenueModel.findById(req.params.id).then(function (db_users_array) {
    console.log(db_users_array);
    res.render('userside/displayvenue', { mydata: db_users_array });
  });
});

router.get("/about", function (req, res, next) {
  res.render("userside/about", { title: "Express" });
});


//contact route
router.get("/contact", function (req, res, next) {
  res.render("userside/contact", { title: "Express" });
});

// contact routes processing


router.post("/contactprocess", function (req, res, next) {
  
  var cdata = {

    name : req.body.name,
    phone : req.body.phone,
    email : req.body.email,
    message : req.body.message,

  };

  ContactModel.create(cdata)
    .then(() => console.log("Successfully created"))
    .catch((err) => console.log(err));
  res.redirect('/contact')
});
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "goswamialpesh1998@gmail.com",
    pass: "xgal luvo akrs ajyu",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'goswamialpesh1998@gmail.com', // sender address
    to: "goswamialpesh1998@gmail.com", // list of receivers
    subject: "cotact details", // Subject line
    html : '<h2>my name is '
   // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

router.get('/contactdisplay', function (req, res, next) {
  ContactModel.find()
            .then(data=>{
                console.log(data);
                res.render('contact/contactdisplay' , {cdata: data});
            })
    .catch((err) => console.log(err));
});

// Delete USer

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;

  ContactModel.findByIdAndDelete(id)
  .then(data => {
    res.redirect('/contactdisplay')
  })
  .catch(err => console.error(err))
});





router.get("/userlogin", function (req, res, next) {
  res.render("userside/userlogin", { title: "Express" });
});
router.get("/register", function (req, res, next) {
  res.render("userside/register", { title: "Express" });
});

//Signup routes
router.get("/signup", function (req, res, next) {
  res.render("admin/admin_signup");
});

//Signup Processing
router.post("/signup", function (req, res, next) {
  const admin_signup = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(admin_signup);

  AdminModel.create(admin_signup)
    .then(() => console.log("Signed Up Success"))
    .catch((err) => console.log(err));
  res.redirect("/login");
});

//Login routes
router.get("/login", function (req, res, next) {
  res.render("login");
});

//Login Processing
router.post("/login", function (req, res, next) {
  var email = req.body.u_name;
  console.log(email);
  var password = req.body.u_pass;
  console.log(password);

  AdminModel.findOne({ email: email }).then(function (db_users_array) {
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
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  });
});

//Dashboard Redirect if and only if login

router.get("/dashboard", function (req, res, next) {
  if (!req.session.email1) {
    console.log("Email Session is Set");
    res.end(
      "Login required to Access this page , please Go to Login Page And After Access This Page"
    );
  }

  res.render("dashboard", { email: req.session.email1 });
});




router.get("/displayvenue", function (req, res, next) {

  VenueModel.find()
  .then(data=>{
      console.log(data);
      res.render('userside/displayvenue' , {vdata: data});
  })
});




router.get("/userbooking", function (req, res, next) {
  res.render("userside/userbooking", { title: "Express" });
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
  res.redirect('thankyou')
});



router.get('/display', function (req, res, next) {
  BookingModel.find()
            .then(data=>{
                console.log(data);
                res.render('booking/displaybooking' , {bdata: data});
            })
    .catch((err) => console.log(err));
});







//User Signup
router.get("/usersignup", function (req, res, next) {
  res.render("userside/signup", { title: "Express" });
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
         res.redirect('usersignup')

});

router.get('/display', function (req, res, next) {
  UserModel.find()
            .then(data=>{
                console.log(data);
                res.render('user/displayuser' , {udata: data});
            })
    .catch((err) => console.log(err));
});



router.get("/thankyou" , function(req ,res, next) {
  res.render("userside/thankyou", { title: "Express" });
})

router.get("/view" , function(req ,res, next) {


  BookingModel.find()
  .then(data=>{
      console.log(data);
      res.render('userside/viewdata' , {bdata: data});
  })
.catch((err) => console.log(err));
})


//Change password

router.get("/changepassword", function (req, res, next) {
  if (!req.session.email1) {
    console.log("Email Session is Set");
    res.redirect("/login");
  }
  res.render("changepassword");
});

// Change password method


router.post("/changepassword", function (req, res, next) {
  if (!req.session.email1) {
    console.log("Email Session is Set");
    res.redirect("/login");
  }
  console.log("Home Called " + req.session.email1);

  var myemail = req.session.email1;
  var currentpassword = req.session.opass;
  var newpassword = req.body.npass;
  var confirmpassword = req.body.c_pass;

  AdminModel.findOne({ email: myemail }).then(function (db_user_array) {
    console.log(db_user_array);

    if (currentpassword == db_user_array.user_password) {
      if (currentpassword == newpassword) {
        res.end(" New password  must be different then  old password");
      } else {
        if (newpassword == confirmpassword) {
          AdminModel.findOneAndUpdate(
            { email: myemail },
            { $set: { password: newpassword } }
          ).then(function () {
            res.redirect("/login");
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



//forgotpasssword

router.get("/forgotpassword", function (req, res, next) {
  res.render("forgotpassword", { title: "Express" });
});


//forgotpassword method


router.post("/forgotpassword", function (req, res, next) {
  var email = req.body.email;
  console.log(email);

  AdminModel.findOne({ email: email }).then(function (db_users_array) {
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
  res.redirect("/login");
});



router.get('/bookmark',function(req,res,next){
  
  BookmarksModel.find()
  .then((data)=>{
    console.log("bookmark done")
    res.render('userside/bookmark',{mydata : data});
  })
})

//bookmark post 

router.post('/bookmark',function(req,res,next){
    
  BookmarksModel.findById(req.body.id).then(function(data){
    
    var mydata = {
      // workerid : req.body.id,
      venueName : req.body.title,
      venuepic : req.body.image,
      venueprice : req.body.price,
  }
  BookmarksModel.create(mydata)
  .then(()=>console.log(""))
  .catch((err)=>console.log(err));
    res.redirect('/bookmark');
  });
});

router.post('/addapi', function(req , res , next ){
  res.send(JSON.stringify("Yes , it's working"));
})
router.get('/displayapi', function(req , res , next ){
  res.send(JSON.stringify("Yes , it's working"));
})

module.exports = router;
