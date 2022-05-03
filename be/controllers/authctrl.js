//const connection = require("../config/db")
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../model/user");
const { response } = require('../index.js');
const {UserAuth} = require("../services/auth.js")
const router = express.Router();
const passport = require('passport')
require('../config/mongo/passport')

genToken = user => {
  return jwt.sign({
    iss: 'TOP_SECRET',
    sub: user.id,
    email: user.email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'TOP_SECRET');
}

                  
router.post("/register", async (req, res) =>
{
  const data = req.body;
  const response={}
  try{
      const result = await UserAuth.registerUser(data);          

      if(result){
          response.success = true;
          response.user = result;
          response.status = "200";
          res.status(200).send(response);
      }else{
          response.success = false;
          response.error = "Registeration not successful";
          response.status = "400";
          res.status(400).send(response);
      }
  }catch(e){
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
  }

})

router.post("/login", async (req, res) =>
{
  const data = req.body;
  const response={}
  try{
      const result = await UserAuth.loginUser(data);          

      if(result){
          response.success = true;
          response.user = result;
          response.status = "200";
          res.status(200).send(response);
      }else{
          response.success = false;
          response.error = "Incorrect Username or Password";
          response.status = "400";
          res.status(400).send(response);
      }
  }catch(e){
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
  }
})

router.post("/logout",passport.authenticate('jwt',{session: false}), async (req, res) =>
{
  const response={}
  try{
        var authorization = req.headers.authorization.split(' ')[1],
        decoded;
        decoded = jwt.verify(authorization, 'TOP_SECRET');       
        const result = await UserAuth.logoutUser(decoded);  
        //console.log(result)
      if(result){
          response.success = true;
          response.user = "User Logged out";
          response.status = "200";
          res.status(200).send(response);
      }else{
          response.success = false;
          response.error = "User cannot be logged out";
          response.status = "400";
          res.status(400).send(response);
      }
  }catch(e){
      console.log(e);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = "500";
      res.status(500).send(response);
  }
})



// module.exports.loginuser = async(req, res) =>{
//   const { email, password } = req.body;
  
//   try{
//     let foundUser = await User.findOne({ email });
//     if(await foundUser.matchPassword(password))
//     {
//       let token = genToken(foundUser)
//       console.log(typeof foundUser)
//       console.log(foundUser)
//       res.status(200).json({foundUser, "token":token})
//     }
//   }
//   catch(err)
//   {
//     res.status(500).json({"message":err})
//   }

// }

// module.exports.secretuser = async(req, res) =>{
//   res.status(200).json("Authenticated")
// }

// module.exports.logoutuser = async(req,res) =>{
//   var authorization = req.headers.authorization.split(' ')[1],
//   decoded;
//   decoded = jwt.verify(authorization, 'TOP_SECRET');
//   var temp = await User.findOneAndUpdate({"_id":decoded.sub}, {"lastSeen":new Date()})
//   res.status(200).json({"message":"User logged out successfully"})
// }

module.exports = router