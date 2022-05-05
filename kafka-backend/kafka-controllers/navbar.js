const express = require("express");
const {Question} = require("../kafka-services/question.js");
const {Answer} = require("../kafka-services/answer.js")
const router = express.Router();


const navbarFilter = async (msg, callback) => {
    const data = msg.data;
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
       /* console.log("TAG: " + tag)
        console.log("EXACT: "+exact)
        console.log("AUTHOR: "+author)
        console.log("TYPE: "+type) */

        if(result.data){
            response.success = true;
            response.data = result.data;
            response.status = "200";
            response.message = result;
            callback(null,response);
        }else{
            response.success = false;
            response.error = result.errorMessage;
            response.status = "400";
            callback(null,response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        callback(null,response);
    }
};

function handle_request(msg, callback) {
    if (msg.path === "navbar_filter") {
      navbarFilter(msg, callback);
    }else if (msg.path === "something") {
      someThing(msg, callback);
    }
  }


  exports.handle_request = handle_request;