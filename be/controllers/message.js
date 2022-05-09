const express = require("express");
const {Message} = require("../services/message.js");

const router = express.Router();
//const kafka = require("../kafka/client");


router.post("/createConversation", async (req, res) => {
    let response = {}
    data=req.body;
    try {
        const result = await Message.createConversation(data)

        if (result) {
                response.success = true;
                response.status = "200";
                response.data= result;
                res.status(200).send(response);
        }
        else {
                response.success = false;
                response.error = "Cannot create the new conversation";
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
});


router.get("/getAllUserConversations/:id",async(req,res)=>{
    let response = {}
    data=req.params.id;
    try {
        const result = await Message.getAllUserConversations(data)

        if (result) {
                response.success = true;
                response.status = "200";
                response.data= result;
                res.status(200).send(response);
        }
        else {
                response.success = false;
                response.error = "Cannot get user conversations";
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


router.post("/addMessageToConversation",async(req,res)=>{
    let response = {}
    data=req.body;
    try {
        const result = await Message.addMessageToConversation(data)

        if (result) {
                response.success = true;
                response.status = "200";
                response.data= result;
                res.status(200).send(response);
        }
        else {
                response.success = false;
                response.error = "Cannot add message to a conversation";
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


router.get("/getAllMessagesOfConversation/:id",async(req,res)=>{
    let response = {}
    data=req.params.id;
    try {
        const result = await Message.getAllMessagesOfConversation(data)

        if (result) {
                response.success = true;
                response.status = "200";
                response.data= result;
                res.status(200).send(response);
        }
        else {
                response.success = false;
                response.error = "Cannot add message to a conversation";
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






module.exports = router;