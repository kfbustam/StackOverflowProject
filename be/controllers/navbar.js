const express = require("express");
const {Question} = require("../services/question");
const {User} = require("../services/user");
const {Answer} = require("../services/answer")
const router = express.Router();
const kafka = require("../kafka/client");


router.post("/navbarFilter", async (req, res) => {

    /*const msg = {};
    msg.data = req.body.data;
    msg.path = "navbar_filter";
    kafka.make_request('navbar',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });*/


    const data = req.body.data;
    const response = {}
    try{
        //const result = await Question.getOtherFilteredResults(data);
        let tag;
        let exact;
        let author;
        let type;
        let result;
        if(data[0]=="[")
        {
                if(data.includes("]"))
                {
                    if(data.length==(data.indexOf("]")+1))
                    {
                        tag=data.slice(1,(data.indexOf("]")));
                        result = await Question.getQuestionByTag(tag);
                    }
                    else
                    {
                        tag=data.slice(1,(data.indexOf("]")));
                        exact=data.slice((data.indexOf("]")+1));
                        result = await Question.getQuestionByTag(tag);
                    }
                    
                }
                else
                {
                    exact=data.slice(1);
                    result = await Question.getQuestionByExactmatch(exact);
                }
        }
        else if(data.slice(0,5).toUpperCase()=="USER:")
        {
            if(data.length==5)
            {
                exact=data(0,4)
                result = await Question.getQuestionByExactmatch(exact);

            }
            else
            {
                author=data.slice(5)
                result = await Question.getQuestionByAuthor(author);

            }
        }
        else if(data.slice(0,3).toUpperCase()=="IS:")
        {
            if(data.length==3)
            {
                exact=data(0,2)
                result = await Question.getQuestionByExactmatch(exact);

            }
            else if(data.slice(3).toUpperCase()=="QUESTION")
            {
                type=data.slice(3)
                result = await Question.getAllQuestions();

            }
            else if(data.slice(3).toUpperCase()=="ANSWER")
            {

                type=data.slice(3)
                result = await Answer.getAllAnswers(type);

            }
            else
            {
                exact=data
                result = await Question.getQuestionByExactmatch(exact);

            }
        }
        else if(data.slice(0,11).toUpperCase()=="ISACCEPTED:")
        {
            if(data.length==11)
            {
                exact=data(0,10)
                result = await Question.getQuestionByExactmatch(exact);

            }
            else if(data.slice(11).toUpperCase()=="YES")
            {
                type="YES"
                result = await Question.getQuestionByAcceptance(type);

            }
            else if(data.slice(11).toUpperCase()=="NO")
            {
                type="NO"
                result = await Question.getQuestionByAcceptance(type);

            }
            else
            {
                exact=data;
                result = await Question.getQuestionByExactmatch(exact);

            }
        }
        else
        {
            exact=data;
            result = await Question.getQuestionByExactmatch(exact);

        }       
        if(result.data){
            response.success = true;
            response.data = result.data;
            response.status = "200";
            response.message = result;
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = result.errorMessage;
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