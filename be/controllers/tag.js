const express = require("express");
const {Tag} = require("../services/tag.js")
const router = express.Router();


router.post("/addTag", async (req, res) =>
{
    const data = req.body;
    const response={}
    try{
        const result = await Tag.addTag(data);          

        if(result){
            response.success = true;
            response.tags = result;
            response.status = "200";
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "Tag not found";
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

router.get("/getPopularTags", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Tag.getPopularTags(data);          

        if(result){
            response.success = true;
            response.tags = result;
            response.status = "200";
            res.status(200).send(response);
            //console.log(result);

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


router.get("/getNewTags", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Tag.getNewTags(data);          

        if(result){
            response.success = true;
            response.tags = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Tag not found";
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


router.get("/getNameTags", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Tag.getNameTags(data);          

        if(result){
            response.success = true;
            response.tags = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Tag not found";
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

router.get("/searchTags", async (req, res) => {
    const data = req.body;
    const response={}
    try{
        const result = await Tag.searchTags(data);          

        if(result){
            response.success = true;
            response.tags = result;
            response.status = "200";
            res.status(200).send(response);

        }else{
            response.success = false;
            response.error = "Tag not found";
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
