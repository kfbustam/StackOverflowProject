require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
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

const authenticatectrl = require('./controllers/authctrl.js')
app.post("/register", authenticatectrl.registeruser)
app.post("/login", authenticatectrl.loginuser)
app.get("/secret", passport.authenticate('jwt',{session: false}), authenticatectrl.secretuser)

// server listening 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app