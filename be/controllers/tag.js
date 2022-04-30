const express = require("express");
const {Tag} = require("../services/tag.js")


module.exports.addTag = async(req, res) =>{
    const data = req.body;
    const response={}
    try{
        const result = await Tag.addTag(data);          

        if(result){
            response.success = true;
            response.user = result.user;
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
};

module.exports.getPopularTags = async(req, res) =>{
    const data = req.body;
    const response={}
    try{
        const result = await Tag.getPopularTags(data);          

        if(result){
            response.success = true;
            response.user = result.user;
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
};

module.exports.getNewTags = async(req, res) =>{
    const data = req.body;
    const response={}
    try{
        const result = await Tag.getNewTags(data);          

        if(result){
            response.success = true;
            response.user = result.user;
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
};

module.exports.getNameTags = async(req, res) =>{
    const data = req.body;
    const response={}
    try{
        const result = await Tag.getNameTags(data);          

        if(result){
            response.success = true;
            response.user = result.user;
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
};



