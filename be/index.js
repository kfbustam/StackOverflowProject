require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


// server listening 
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app