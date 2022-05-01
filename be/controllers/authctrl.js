//const connection = require("../config/db")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require("../model/user");
const { response } = require('../index.js');

genToken = user => {
  return jwt.sign({
    iss: 'TOP_SECRET',
    sub: user.id,
    email: user.email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'TOP_SECRET');
}

                  
module.exports.registeruser = async(req, res) =>{
  const { email, password,name } = req.body;
  try{
    //Check If User Exists
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(500).json({ error: 'Email is already in use'});
    }
    const newUser = new User({ email, password,name})
    await newUser.save()
    let token = genToken(newUser)
    res.status(200).json({newUser, "token":token})
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({"message":err})
  }

}

module.exports.loginuser = async(req, res) =>{
  const { email, password } = req.body;
  
  try{
    let foundUser = await User.findOne({ email });
    if(await foundUser.matchPassword(password))
    {
      let token = genToken(foundUser)
      console.log(typeof foundUser)
      console.log(foundUser)
      res.status(200).json({foundUser, "token":token})
    }
  }
  catch(err)
  {
    res.status(500).json({"message":err})
  }

}

module.exports.secretuser = async(req, res) =>{
  res.status(200).json("Authenticated")
}

module.exports.logoutuser = async(req,res) =>{
  var authorization = req.headers.authorization.split(' ')[1],
  decoded;
  decoded = jwt.verify(authorization, 'TOP_SECRET');
  var temp = await User.findOneAndUpdate({"_id":decoded.sub}, {"lastSeen":new Date()})
  res.status(200).json({"message":"User logged out successfully"})
}