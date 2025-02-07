

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
  


  

