var mongoose = require('mongoose');
const QuestionModel = require("../mongo-models/questions.js");
//const tagModel = require('../mongo-models/tag.js');
const TagModel = require("../mongo-models/tag.js")
const CommentsModel= require("../mongo-models/comments")
const { DateTime } = require("luxon");
const UserModel = require('../mongo-models/user.js')

class Question {

        static addQuestion = async (data) => {
                try {
                        let addQuery;
                         if(data.body.includes("<img"))
                         {
                                 addQuery= {
                                         title : data.title,
                                         tags : data.tags,
                                         body : data.body,
                                         user : data.user,
                                         isApproved : false
                                 }
                         }
                         else
                         {
                                 addQuery= {
                                         title : data.title,
                                         tags : data.tags,
                                         body : data.body,
                                         user : data.user
                                 }
 
                         }
                         const question = new QuestionModel(addQuery);
                         const result = await question.save();
                         
                         /*const findQuestionCondition = {
                                 "_id":mongoose.Types.ObjectId(data.user)
                         }
 
                         const updateQuestionCondition = {
                                 $push: {questionIds: result._id}
                         }
 
                         const updateUser = await UserModel.updateOne(findQuestionCondition,updateQuestionCondition)
                
                         if(updateUser)
                         {
                                 result.userUpdated = true;
                         }
                         //While adding the question, checking which tags are present and updating those tags totalCount, todayCount and weekCount
                         let countResult;
                         for(const tag of data.tags)
                         {
                                 const tagData= await tagModel.findById(tag)
                                 const findCondition = {
                                         "_id":mongoose.Types.ObjectId(tag)
                                 }
                                 if(tagData.todaydate == new Date().getDate() && tagData.currentWeek == DateTime.now().weekNumber)
                                 {
                                         const updateCondition = {
                                                 $inc: {
                                                         count:1,
                                                         todaycount:1,
                                                         weekcount:1
                                                 }
                                         }
                                        countResult = await tagModel.updateOne(findCondition,updateCondition);
                                 }
                                 else if(tagData.todaydate == new Date().getDate() && tagData.currentWeek !=  DateTime.now().weekNumber)
                                 {
                                         const updateCondition = {
                                                 currentWeek:DateTime.now().weekNumber,
                                                 weekcount:1,
                                                 $inc: {
                                                         count:1,
                                                         todaycount:1,
                                                 }
                                         }
                                        countResult = await tagModel.updateOne(findCondition,updateCondition);
                                 }
                                 else if(tagData.todaydate != new Date().getDate() && tagData.currentWeek ==  DateTime.now().weekNumber)
                                 {
                                         console.log(tagData.todaydate)
                                         console.log(new Date().getDate())
 
                                         const updateCondition = {
                                                 todaydate:new Date().getDate(),
                                                 todaycount:1,
                                                 $inc: {
                                                         count:1,
                                                         weekcount:1
                                                 }
                                         }
                                        countResult = await tagModel.updateOne(findCondition,updateCondition);
                                 }
                                 else if(tagData.todaydate != new Date().getDate() && tagData.currentWeek !=  DateTime.now().weekNumber)
                                 {
                                         const updateCondition = {
                                                 todaydate:new Date().getDate(),
                                                 currentWeek:DateTime.now().weekNumber,
                                                 todaycount:1,
                                                 weekcount:1,
                                                 $inc: {
                                                         count:1
                                                 }
                                         }
                                        countResult = await tagModel.updateOne(findCondition,updateCondition);
                                 }
                         }

                         if(countResult)
                         {
                                 result.todayCountUpdated = true
                                 result.weekCountUpdated = true
                         }*/
                         if(result)
                         {
                                 return result;
                         }
                         else{
                                 return {};
                         }
                 }
                 catch(err){
                         console.log(err);
                         console.log("Some unexpected error occured while adding question")
                 }
 

 

        }


        static getQuestionByTag = async (data) => {

                try {
                        let result={}
                        const tagQuery = {
                                name:data
                        }
                        const tag = await TagModel.find(tagQuery)
                        if(tag.length != 0)
                        {
                                const query = {
                                        "tags": {
                                                $in:tag[0]._id
                                        }
                                }
                                const questions = await QuestionModel.find(query).populate('tags').populate('answer_id');
                                if(questions?.length)
                                {
                                        result.data=questions
                                        return result;
                                }
                                else{
                                        result.errorMessage="No questions found with this Tag"
                                        return [];
                                }
                        }
                        else{
                                result.errorMessage="There is no Tag available with the entered text "+data
                                //throw new Error("Some unexpected error occurred with the Tag")

                                return result;
                        }

                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error while fethching the questions by tag")
                }

                /*let x;
                x = "This api should give all the questions based on Tag " + data
                console.log(x)
                return x;*/

        }

        static getQuestionByExactmatch = async (data) => {

                try {
                        let searchRegex = new RegExp(`${data}`)
                        const query = {
                                "title": searchRegex
                        }
                        const questions = await QuestionModel.find(query);
                        if(questions?.length)
                        {
                                return questions;
                        }
                        else{
                                return [];
                        }

                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error while fethching the questions by search data")
                }
                /*let x;
                x = "This api should give all the questions which matches the text " + data
                return (x)*/
        }

        static getQuestionByAuthor = async (data) => {
                try {
                        let result={}
                        console.log(data)
                        const query = {
                                "user": data
                        }
                        const questions = await QuestionModel.find(query);
                        if(questions?.length)
                        {
                                result.data=questions
                                return result;
                        }
                        else{
                                result.errorMessage="No questions found with user id "+data
                                return [];
                        }

                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error while fethching the questions by tag")
                }
                /*let x;
                x = "This api should give all the questions posted by the author " + data
                return (x)*/
        }

        static getAllQuestions = async (data) => {
                try {
                        let result = {}
                        const questions = await QuestionModel.find({}).limit(2700);
                        if (questions?.length) {
                                result.data=questions
                            return result;
                        } else {
                            return [];
                        }
            
                    } catch (err) {
                        console.log(err);
                        throw new Error("Some unexpected error occurred while getting the questions");
                    }
        }

        static getQuestionByAcceptance = async (data) => {
                let x;

                x = "This api should give all the questions or answers based on the acceptance type " + data
                return (x)
        }


        static addComment = async (data) => {
                try {
                        let addQuery;
                        
                                 addQuery= {
                                         comment: data.comment,                                       
                                         user : data.user,
                                         question_id : data.question
                                 } 
                         
                         const comment = new CommentsModel(addQuery);
                         const result = await comment.save();
                         console.log("Comment result", result);                                            
                        
                 }
                 catch(err){
                         console.log(err);
                         console.log("Some unexpected error occured while adding Comment")
                 }
 

        }


}



module.exports.Question = Question;