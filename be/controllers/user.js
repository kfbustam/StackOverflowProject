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


module.exports = router;
