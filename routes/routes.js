const { response } = require('express');
const express = require('express');
const router = express.Router()
const signuptemp=require("../models/signupmodel")
const productsignuptemp = require("../models/bookingproduct");
const orderproducttemp = require("../models/orderproduct");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const bookingproduct = require('../models/bookingproduct');
router.post('/register',async (req,res)=>{
    const saltpwd = await bcrypt.genSalt(10);
    const securepassword = await bcrypt.hash(req.body.password,saltpwd);
    const signupuser = new signuptemp({
        fullname:req.body.fullname,
        email:req.body.email,
        password:securepassword,
        role:req.body.role
    })
    signupuser.save()
    .then(data=>{
        res.json(data);
    })
    .catch(e=>{
        res.json(e);
    })
});

router.post('/productregister',async (req,res)=>{
  const productsignup = new productsignuptemp(req.body);
  productsignup.save()
  .then(data=>{
      console.log(data);
      res.json(data);
  })
  .catch(e=>{
      res.json(e);
  })
});

router.get('/products',async (req,res)=>{
  productsignuptemp.find()
  .then((product)=>{
      res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/myproducts',async (req,res)=>{
  productsignuptemp.find({mail:req.body.email})
  .then((product)=>{
      res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/buynow',async (req,res)=>{
  const ordernow = new orderproducttemp(req.body);
  ordernow.save()
  .then((pro)=>{
    res.send("Order Created!!");
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/login',async (req,res)=>{
    signuptemp.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
              userRole:user.role
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            role:user.role,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

router.post('/getproductdetails',async (req,res)=>{
  productsignuptemp.find({_id:req.body.id})
  .then((product)=>{
      res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/myorders',async (req,res)=>{
  orderproducttemp.find({mail:req.body.email})
  .then((product)=>{
      res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/deleteorder',async (req, res)=>{
  productsignuptemp.remove({_id:req.body.bid})
  .then((pp)=>{
      res.send("Deleted Successful");
  })
  .catch((err)=>{ console.log(err); })
})




router.post('/editorder',async (req, res)=>{
  var outres=req.body;

  productsignuptemp.updateOne(outres.id,{
    $set:req.body.resultdata
  })
  .then((pp)=>{
      res.send(pp);
  })
  .catch((err)=>{ console.log(err); })
})


router.get('/allfarmers',async (req,res)=>{
  signuptemp.find({role:"Farmer"})
  .then((product)=>{
      res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.get('/allbuyers',async (req,res)=>{
  signuptemp.find({role:"Seller"})
  .then((product)=>{
      res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/productdata',async (req,res)=>{
  console.log(req.params.productid);
  bookingproduct.find({_id:req.body.productid})
  .then((product)=>{
    console.log(product);  
    res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})

router.post('/profileview',async (req,res)=>{
  console.log(req.params.email);
  signuptemp.find({email:req.body.email})
  .then((product)=>{
    res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})


router.post('/emailexists',async (req,res)=>{
  console.log("kfhsdkfhdsufhsdifhdsiufhusfidshifusdhf")
  signuptemp.find({email:req.body.email})
  .then((product)=>{
    console.log(product);
    res.send(product);
  })
  .catch((err)=>{
    res.status(400).send({
      message: "Error",
      err,
    });
  })
})
module.exports=router