require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Questions = require("./model/questions");
const User = require("./model/user");
const Answers = require("./model/answers");
const question = require("./controllers/question");
const navbar = require("./controllers/navbar");
const answer = require("./controllers/answer");
const tag = require("./controllers/tag.js")


const tagModel = require("./model/tag");

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
const imgctrl = require("./controllers/image-controller.js")
const questionController = require("./controllers/question.js")


app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.post("/logout",passport.authenticate('jwt',{session: false}),authenticatectrl.logoutuser)
app.get("/secret", passport.authenticate('jwt',{session: false}), authenticatectrl.secretuser)
app.post("/uploadshopdp",upload.single('profile-file'), imgctrl.uploadpic)
app.get("/image/:key",imgctrl.retrieveImg)



// server listening 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



app.use('/api/tag',tag)
app.use('/api/question',question);
app.use('/api/navbar',navbar);
app.use('/api/answer',answer);


module.exports = app