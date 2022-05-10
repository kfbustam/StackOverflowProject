const express = require("express");
const {User} = require("../services/user")
const jwt = require("jsonwebtoken");
const passport = require('passport')
const router = express.Router();
//const redis = require("./rediscxn")


// const runApp1 = async () => {
// console.log(client)

router.get("/getAllBadges/:id", async(req,res)=>
{
    const user = req.params.id
    const response={}
    try{
        const result = await User.getAllBadges(user);          
        //await client.set('user', JSON.stringify(result))
        if(result){
            response.success = true;
            response.tags = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "No badges found";
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


router.get("/getPopularUsers", async (req, res) => {
    const data = req.body;
    const response={}
    try{

        const result = await User.getPopularUsers(data);          
        //await client.set('user', JSON.stringify(result))
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "User not found";
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
//}
//runApp1()


router.get("/getNewUsers", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await User.getNewUsers(data);          

        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "User not found";
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


router.get("/searchUsers", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await User.searchUsers(data);          

        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "User not found";
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

router.post("/updateLocation",passport.authenticate('jwt',{session: false}), async (req, res) => {
    const data = req.body;
    const response={}
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET'); 
    try{
        const result = await User.updateLocation(decoded, data);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Location has not been updated.";
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

router.get("/getBasicDetails",passport.authenticate('jwt',{session: false}), async (req, res) => {
    //const data = req.body;
    const response={}
    var authorization = req.headers.authorization.split(' ')[1],
    decoded;
    decoded = jwt.verify(authorization, 'TOP_SECRET'); 
    try{
        const result = await User.getBasicDetails(decoded);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Location has not been updated.";
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

router.get("/top10Results", async (req, res) => {
    const response={}
    try{
        const result = await User.top10Results();          

        if(result){
            response.success = true;
            response.top10Results = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Top 10 results not found";
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


router.get("/getProfileTab/:id", async (req, res) => {
    const userId = req.params.id;
    const response={} 
    try{
        //console.log(userId)
        const result = await User.getProfileTab(userId);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Cannot retrieve the profile tab details";
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

router.post("/editAbout", async (req, res) => {
    const data = req.body;
    const response={} 
    try{
        //console.log(userId)
        const result = await User.editAbout(data);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Cannot edit the about of the user";
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

router.get("/getAnswersTab/:id", async (req, res) => {
    const response={} 
    try{
        //console.log(userId)
        const result = await User.getAnswersTab(req.params.id);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Cannot get the answers tab of the user";
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

router.get("/getQuestionsTab/:id", async (req, res) => {
    const response={} 
    try{
        //console.log(userId)
        const result = await User.getQuestionsTab(req.params.id);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Cannot get the questions tab of the user";
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

router.get("/getTagsTab/:id", async (req, res) => {
    const response={} 
    try{
        //console.log(userId)
        const result = await User.getTagsTab(req.params.id);          
        if(result){
            response.success = true;
            response.user = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Cannot get the questions tab of the user";
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
