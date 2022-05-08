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
const user = require("./controllers/user")
const tag = require("./controllers/tag.js")
const authenticatectrl = require('./controllers/authctrl')
const imgctrl = require("./controllers/image-controller")
const questionController = require("./controllers/question")
//const testredis = require("./controllers/redis")


const tagModel = require("./model/tag");

var cors = require('cors');
const jwt = require('jsonwebtoken');
const responseTime = require('response-time')
const redis = require('redis')
const axios = require('axios')

const InitiateMongoServer = require("./config/mongo/mongodb")
InitiateMongoServer()

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(responseTime())

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

app.use("/api/auth", authenticatectrl)

app.post("/uploadshopdp",upload.single('profile-file'), imgctrl.uploadpic)
app.get("/image/:key",imgctrl.retrieveImg)

app.use('/api/tag',tag)
app.use('/api/question',question);
app.use('/api/navbar',navbar);
app.use('/api/answer',answer);
app.use('/api/user',user)

// server listening 
app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app