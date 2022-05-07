var mongoose = require('mongoose');
const QuestionModel = require("../model/questions.js");
const tagModel = require('../model/tag.js');
const UserModel = require('../model/user.js')
//const TagModel = require("../model/tag.js")
const { DateTime } = require("luxon");

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
                         
                         const findQuestionCondition = {
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
                         }
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
                        const tag = await tagModel.find(tagQuery)
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

        }


        static getQuestionByTag = async (data) => {

                try {
                        let result={}
                        const tagQuery = {
                                name:data
                        }
                        const tag = await tagModel.find(tagQuery)
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
                        const questions = await QuestionModel.find({}).sort({"createAt":1});
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

        static upvoteQuestion = async(data) =>{
                //Updating Question Params
                let question_doc = await QuestionModel.findOne({"_id":data.questionId})
                const upvoteval = question_doc["upvote"]+1
                const  scoreval = upvoteval -  question_doc["downvote"]
                
                // Updating Owner Reputation Params
                let owner_doc = await UserModel.findOne({"questionIds":data.questionId})
                //console.log(owner_doc)
                let ownerid = owner_doc["_id"]
                let reputationval = owner_doc["reputation"]+10


                //Updating User upvote count
                let user_doc = await UserModel.findOne({"_id":data.userId})
                let upvotegnval = user_doc["upvote_given"]+1


                let score_update = await QuestionModel.findOneAndUpdate({"_id":data.questionId}, {"upvote":upvoteval, "score":scoreval})
                let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerid},{"reputation":reputationval})
                let upvotegn_update = await UserModel.findOneAndUpdate({"_id":data.userId},{"upvote_given":upvotegnval}) 

                return {"score":scoreval}
        }

        static downvoteQuestion = async(data) =>{
                //Updating Question Params
                let question_doc = await QuestionModel.findOne({"_id":data.questionId})
                const downvoteval = question_doc["downvote"]+1
                const  scoreval = question_doc["upvote"] - downvoteval  
                
                // Updating Owner Reputation Params
                let owner_doc = await UserModel.findOne({"questionIds":data.questionId})
                let ownerid = owner_doc["_id"]
                let reputationval = owner_doc["reputation"]-10


                //Updating User upvote count
                let user_doc = await UserModel.findOne({"_id":data.userId})
                let downvotegnval = user_doc["downvote_given"]+1


                let score_update = await QuestionModel.findOneAndUpdate({"_id":data.questionId}, {"downvote":downvoteval, "score":scoreval})
                let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerid},{"reputation":reputationval})
                let downvotegn_update = await UserModel.findOneAndUpdate({"_id":data.userId},{"downvote_given":downvotegnval}) 

                return {"score":scoreval}
        }


}





module.exports.Question = Question;