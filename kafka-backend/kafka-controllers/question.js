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

    const getAllQuestions = async (msg, callback) => {
        const response={}
    try{
        const result = await Question.getAllQuestions();
        if(result){
            response.success = true;
            response.status = "200";
            response.question= result.data;
            callback(null,response);
        }else{
            response.success = false;
            response.error = "Cannot fetch the questions";
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

    const addComment = async (msg, callback) => {

        const question = msg.question;
        const response={}
        try{
            const result = await Question.addComment(question);
            if(result){
                response.success = true;
                response.user = question.user;
                response.status = "200";
           
                response.userUpdated=result.userUpdated;
                callback(null,response);
            }else{
                response.success = false;
                response.error = "Cannot add the Comment";
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
        }else if (msg.path === "get_all_questions") {
          getAllQuestions(msg, callback);
        }else if(msg.path ==="addQuestionComments"){
          addComment(msg, callback)
        }
      }
    
    
      exports.handle_request = handle_request;