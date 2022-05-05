//const { response } = require("express");
const express = require("express");
const router = express.Router();
const {Question} = require("../services/question.js")
const bcrypt = require('bcryptjs');
//const kafka = require("../kafka/client");
const { response } = require("../index.js");

const redis = require('redis')
var client;
const runApp = async () => {  client = redis.createClient()
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    console.log('Redis connected!')}
runApp()



router.post("/addQuestion",  async (req, res) => {

    console.log(req.body);
    console.log("asdasdasdasda")
    const msg = {};
    msg.question = req.body;
    msg.path = "add_question";
    kafka.make_request('question',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
    
    /*const data = req.body;
    const response={}
    try{
        const result = await Question.addQuestion(data);
        console.log(result.userUpdated)
        if(result){
            response.success = true;
            response.user = data.user;
            response.status = "200";
            response.todayCountUpdated = result.todayCountUpdated;
            response.weekCountUpdated = result.weekCountUpdated;
            response.userUpdated=result.userUpdated;

            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot add the question";
            response.status = "400";
            res.status(400).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }*/
});

router.post("/upvoteQuestion", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Question.upvoteQuestion(data);
        if(result){
            response.success = true;
            response.user = data.user;
            response.status = "200";
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot upvote the question";
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


const runRedis = async() =>{
    router.get("/getAllQuestions",  async (req, res) => {
        let response={}

        try{

            const cacheQuestions = await client.get('allQuestions')
            if (cacheQuestions) {
              {
                const temp = JSON.parse(cacheQuestions)
                response.success = true;
                response.user = temp;
                response.status = "200";
                res.status(200).send(response);
              }
            }
            else{
                result = await Question.getAllQuestions();
                await client.set('allQuestions', JSON.stringify(result))
    
                if(result){
                    response.success = true;
                    response.status = "200";
                    response.question= result.data;
                    res.status(200).send(response);
                }else{
                    response.success = false;
                    response.error = "Cannot fetch the questions";
                    response.status = "400";
                    res.status(400).send(response);
                }
            }
           
        }catch(e){
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }
    
    })    
}
runRedis()


module.exports = router;