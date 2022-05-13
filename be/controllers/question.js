//const { response } = require("express");
const express = require("express");
const router = express.Router();
const {Question} = require("../services/question.js")
const bcrypt = require('bcryptjs');
const kafka = require("../kafka/client");
const { response } = require("../index.js");
const jwt = require("jsonwebtoken");
const redis = require('redis')
const passport = require('passport')
// var client;
// const runApp = async () => {  client = redis.createClient()
//     client.on('error', (err) => console.log('Redis Client Error', err));
//     await client.connect();
//     console.log('Redis connected!')}
// runApp()



router.post("/addQuestion",  async (req, res) => {
    const msg = {};
    msg.data = req.body;
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
        if(result){
            //console.log(result)
            response.success = true;
            response.user = data.user;
            response.question_id = result["_id"]
            response.status = "200";
            response.todayCountUpdated = result.todayCountUpdated;
            response.weekCountUpdated = result.weekCountUpdated;
            response.userUpdated=result.userUpdated;

            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot add the question";
            response.status = "400";
            console.log(response);
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

router.get('/getById/:id', async (req, res) => {
    const question_id = req.params.id

    const response = {}
    try {
        const result = await Question.getQuestionById(question_id)

        if(result){
            response.success = true;
            response.question = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Failed to find question by id.";
            response.status = "400";
            res.status(400).send(response);
        }
    } catch (err) {
        console.log(err);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
})


// Interesting, Hot, Score, Unanswered questions on Dashboard
router.get('/getQuestionsByFilter/:filter', async (req, res) => {
    const filter = req.params.filter

    const response = {}
    try {
        const result = await Question.getQuestionsByFilter(filter)

        if(result){
            response.success = true;
            response.question = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Failed to find question by id.";
            response.status = "400";
            res.status(400).send(response);
        }
    } catch (err) {
        console.log(err);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
})


router.get('/search/:query?', async (req, res) => {
    const query = req.params.query

    const response = {}

    try {
        const result = await Question.search(query)

        if(result){
            response.success = true;
            response.posts = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Failed to find posts from search query.";
            response.status = "400";
            res.status(400).send(response);
        }
    } catch(err) {
        console.log(err);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
})


    //Base
    router.get("/getAllQuestions",  async (req, res) => {
        let response={}

        try{

            // const cacheQuestions = await client.get('allQuestions')
            // if (cacheQuestions) {
            //   {
            //     const temp = JSON.parse(cacheQuestions)
            //     response.success = true;
            //     response.user = temp;
            //     response.status = "200";
            //     res.status(200).send(response);
            //   }
            // }
            // else{
                let result = await Question.getAllQuestions();
                //await client.set('allQuestions', JSON.stringify(result))
    
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
           
        }catch(e){
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }
    
    })    

// const runRedis = async() =>{
//     router.get("/getAllQuestions",  async (req, res) => {
//         let response={}

//         try{

//             const cacheQuestions = await client.get('allQuestions')
//             if (cacheQuestions) {
//               {
//                 const temp = JSON.parse(cacheQuestions)
//                 response.success = true;
//                 response.user = temp;
//                 response.status = "200";
//                 res.status(200).send(response);
//               }
//             }
//             else{
//                 result = await Question.getAllQuestions();

    
//                 if(result){
//                     response.success = true;
//                     response.status = "200";
//                     response.question= result.data;
//                     res.status(200).send(response);
//                 }else{
//                     response.success = false;
//                     response.error = "Cannot fetch the questions";
//                     response.status = "400";
//                     res.status(400).send(response);
//                 }
           
//         }catch(e){
//             console.log(e);
//             response.success = false;
//             response.error = "Some error occurred. Please try again later";
//             response.status = "500";
//             res.status(500).send(response);
//         }
    
//     })    
    router.get('/getByTag/:tag', async (req, res) => {
        let response = {}

        try {
            const result = await Question.getQuestionByTag(req.params.tag)
            console.log("RESULT",result)

            if (result) {
                    response.success = true;
                    response.status = "200";
                    response.questions= result.data;
                    response.description = result.description
                    res.status(200).send(response);
            }
            else {
                    response.success = false;
                    response.error = "Cannot fetch the questions by tag";
                    response.status = "400";
                    res.status(400).send(response);
            }
        } catch(e) {
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }
    })


    router.get('/questionAnalysis', async (req, res) => {
        let response = {}

        try {
            const result = await Question.questionAnalysis()

            if (result) {
                    response.success = true;
                    response.status = "200";
                    response.data= result.data;
                    res.status(200).send(response);
            }
            else {
                    response.success = false;
                    response.error = "Cannot fetch the questions data";
                    response.status = "400";
                    res.status(400).send(response);
            }
        } catch(e) {
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }

    })


    router.post('/addBookmark', async (req, res) => {
        let response = {}

        let data=req.body;

        try {
            const result = await Question.addBookmark(data)

            if (result) {
                    response.success = true;
                    response.status = "200";
                    response.data= result.data;
                    res.status(200).send(response);
            }
            else {
                    response.success = false;
                    response.error = "Cannot add the question to bookmarks";
                    response.status = "400";
                    res.status(400).send(response);
            }
        } catch(e) {
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }

    })

    router.post('/deleteBookmark', async (req, res) => {
        let response = {}

        let data=req.body;

        try {
            const result = await Question.deleteBookmark(data)

            if (result) {
                    response.success = true;
                    response.status = "200";
                    response.data= result.data;
                    res.status(200).send(response);
            }
            else {
                    response.success = false;
                    response.error = "Cannot delete the question from bookmarks";
                    response.status = "400";
                    res.status(400).send(response);
            }
        } catch(e) {
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }

    })

    router.post('/getAllBookmarkedQuestions', async (req, res) => {
        let response = {}

        let data=req.body;

        try {
            const result = await Question.getAllBookmarkedQuestions(data)

            if (result) {
                    response.success = true;
                    response.status = "200";
                    response.data= result.questions;
                    res.status(200).send(response);
            }
            else {
                    response.success = false;
                    response.error = "No questions bookmarked";
                    response.status = "400";
                    res.status(400).send(response);
            }
        } catch(e) {
            console.log(e);
            response.success = false;
            response.error = "Some error occurred. Please try again later";
            response.status = "500";
            res.status(500).send(response);
        }

    })
// }
// runRedis()

router.get('/getAllQuestionActivities/:id', async (req, res) => {
    let response = {}

    let id=req.params.id;

    try {
        const result = await Question.getAllQuestionActivities(id)

        if (result) {
                response.success = true;
                response.status = "200";
                response.data= result;
                res.status(200).send(response);
        }
        else {
                response.success = false;
                response.error = "Cannot get question activity";
                response.status = "400";
                res.status(400).send(response);
        }
    } catch(e) {
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }

})

router.post("/upvoteQuestion",  async (req, res) => {
    let response={}

    try{
            let result = await Question.upvoteQuestion(req.body);


            if(result){
                response.success = true;
                response.status = "200";
                response.score= result;
                res.status(200).send(response);
            }else{
                response.success = false;
                response.error = "Cannot upvote the questions";
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

router.post("/downvoteQuestion",  async (req, res) => {
    let response={}

    try{
            let result = await Question.downvoteQuestion(req.body);


            if(result){
                response.success = true;
                response.status = "200";
                response.score= result;
                res.status(200).send(response);
            }else{
                response.success = false;
                response.error = "Cannot downvote the questions";
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

router.put("/updateQuestion/:id",  async (req, res) => {
    
    const _id = req.params.id;
    let data = req.body;

    const response={}
    try{
        const result = await Question.updateQuestion(_id, data);
        if(result){
            response.success = true;
            response.question = result;
            response.status = "200";
            response.todayCountUpdated = result.todayCountUpdated;
            response.weekCountUpdated = result.weekCountUpdated;
            response.userUpdated=result.userUpdated;
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot update the question";
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


router.post("/addComment", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Question.addComment(data);
        if(result){
            response.success = true;
            response.data = result;
            response.status = "200";       
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Cannot add the Comment";
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

    router.get("/getAdminApprovalQuestions", async (req, res) => {
        const response={}
        try{
            const result = await Question.getAdminApprovalQuestions();          
    
            if(result){
                response.success = true;
                response.questions = result;
                response.status = "200";
                res.status(200).send(response);
    
            }else{
                response.success = false;
                response.error = "Admin approval question results not found";
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

    router.put("/adminUpdatedQuestion/:id", async (req, res) => {
        const response={}
        const _id= req.params.id
        try{
            const result = await Question.adminUpdatedQuestion(_id);          
    
            if(result){
                response.success = true;
                response.question = result;
                response.status = "200";
                res.status(200).send(response);
    
            }else{
                response.success = false;
                response.error = "Admin updated question results not found";
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