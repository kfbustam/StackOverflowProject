require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Questions = require("./model/questions");
const User = require("./model/user");
const Answers = require("./model/answers");

var cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const InitiateMongoServer = require("./config/mongo/mongodb")
InitiateMongoServer()
require('./config/mongo/passport')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now()+'-'+file.originalname)
  }
})

var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


const authenticatectrl = require('./controllers/authctrl.js')
app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.get("/secret", passport.authenticate('jwt',{session: false}), authenticatectrl.secretuser)

//get Tags from Sidebar
app.get("/tags", async (req,res) => {
  try {
    const tags = await Questions.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }      
    ]);
    res.stataus(200).json(tags);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//get recent questions from Sidebar
app.get("/questions", (req, res) => {
  Questions.find({})
           .sort({createdAt: 1}) 
           .populate("user_id")
           .exec((err, result) => {
   if (err) {
     console.log(err);
     res.send(err);
   } else {
     res.status(200).send(result);
   }
 });
});

// Get all users from Sidebar based on reputation
app.get("/users", async (req, res) => {
  try {
    const { sortType = '-reputation' } = req.body;
    const users = await User.find().sort(sortType);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


// server listening 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app