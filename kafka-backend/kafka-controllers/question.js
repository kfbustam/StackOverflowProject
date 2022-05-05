//const { response } = require("express");
const express = require("express");
const router = express.Router();
const {Question} = require("../kafka-services/question.js")
const bcrypt = require('bcryptjs');

const addQuestion = async (msg, callback) => {

    const question = msg.question;
    const response={}
    try{
        const result = await Question.addQuestion(question);
        if(result){
            response.success = true;
            response.user = question.user;
            response.status = "200";
            response.todayCountUpdated = result.todayCountUpdated;
            response.weekCountUpdated = result.weekCountUpdated;
            response.userUpdated=result.userUpdated;
            callback(null,response);
        }else{
            response.success = false;
            response.error = "Cannot add the question";
            response.status = "400";
            callback(null,response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        callback(null,response);
    }
    };

    function handle_request(msg, callback) {
        if (msg.path === "add_question") {
            addQuestion(msg, callback);
        }else if (msg.path === "something") {
          someThing(msg, callback);
        }
      }
    
    
      exports.handle_request = handle_request;