//const { response } = require("express");
const express = require("express");
const router = express.Router();
//const {Answer} = require("../services/answer")
const bcrypt = require('bcryptjs');

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



module.exports = router;