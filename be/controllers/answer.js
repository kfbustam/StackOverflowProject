//const { response } = require("express");
const express = require("express");
const router = express.Router();
const {Answer} = require("../services/answer")
const bcrypt = require('bcryptjs');
const { Question } = require("../services/question");

router.post("/addAnswer", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Answer.addAnswer(data); 
        if(result){
            response.success = true;
            response.user = data.user;
            response.status = "200";
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot add the answer";
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
});


router.post("/getAllAnswers", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Answer.getAllAnswers(data);
        if(result){
            response.success = true;
            response.user = data.user;
            response.status = "200";
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot find the answers";
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
});

router.post("/upvoteAnswer",  async (req, res) => {
    let response={}

    try{
            result = await Answer.upvoteAnswer(req.body);


            if(result){
                response.success = true;
                response.status = "200";
                response.score= result;
                res.status(200).send(response);
            }else{
                response.success = false;
                response.error = "Cannot upvote the answers";
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

router.post("/downvoteAnswer",  async (req, res) => {
    let response={}

    try{
            result = await Answer.downvoteAnswer(req.body);


            if(result){
                response.success = true;
                response.status = "200";
                response.score= result;
                res.status(200).send(response);
            }else{
                response.success = false;
                response.error = "Cannot downvote the answers";
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

router.post("/bestAnswer",  async (req, res) => {
    let response={}

    try{
            result = await Answer.bestAnswer(req.body);


            if(result){
                response.success = true;
                response.status = "200";
                response.status= "Best Answer Set Successfully";
                res.status(200).send(response);
            }else{
                response.success = false;
                response.error = "Cannot set the best Answer";
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


module.exports = router;