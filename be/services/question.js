var mongoose = require('mongoose');
const QuestionModel = require("../model/questions.js");
const tagModel = require('../model/tag.js');
const TagModel = require("../model/tag.js")
const UserModel = require("../model/user.js")
const CommentsModel = require("../model/comments.js")
//const TagModel = require("../model/tag.js")
const { DateTime } = require("luxon");
const CountModel = require("../model/count.js");
const AnswerModel = require('../model/answers.js');
const ActivityModel = require('../model/activity.js');
var moment = require('moment');


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
                                 if(tagData.todaydate === new Date().getDate() && tagData.currentWeek === DateTime.now().weekNumber)
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
                                 else if(tagData.todaydate === new Date().getDate() && tagData.currentWeek !==  DateTime.now().weekNumber)
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
                                 else if(tagData.todaydate !== new Date().getDate() && tagData.currentWeek ===  DateTime.now().weekNumber)
                                 { 
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
                                 else if(tagData.todaydate !== new Date().getDate() && tagData.currentWeek !==  DateTime.now().weekNumber)
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
                         //measuring count of questions
                         const countData = await CountModel.find({"date":new Date().toJSON().substring(0,10)})
                        if(countData?.length)
                        {

                                if(countData[0].date === new Date().toJSON().substring(0,10))
                                {
                                        const updateCount = await CountModel.updateOne({"_id":countData[0]._id},{$inc:{"count":1}})

                                }
                                else
                                {
                                        const addCountCondition = {
                                                date: new Date().toJSON().substring(0,10),
                                                 count:1
                                                }        
                                        
                                        const addCount = new CountModel(addCountCondition)
                                        const result = await addCount.save()
                                }
                                
                        }
                        else
                        {
                                const addCountQuery = {
                                        date: new Date().toJSON().substring(0,10),
                                        count: 1
                                }
                                const addCount = new CountModel(addCountQuery);
                                const result = await addCount.save();
                        }
                        //creating question activity
                        const activityQuery = {
                                date: new Date(),
                                what: "asked",
                                user: data.user,
                                comment: "Question created"
                        }
                        const addActivity = new ActivityModel(activityQuery)
                        const activity = await addActivity.save()
                        const updateQuestion = await QuestionModel.findOneAndUpdate({"_id":result._id},{$push: {activity: activity._id}})


                        //sending the add question results
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
                        if(tag.length !== 0)
                        {
                                const query = {
                                $and:[
                                       { "tags": {
                                                $in:tag[0]._id
                                        }},
                                        {"isApproved":true}
                                ]
                                }
                                const questions = await QuestionModel.find(query).populate('tags', 'name')
                                        .populate('user', 'username reputation')
                                        .populate('answer_id', 'isBest')
                                if(questions?.length)
                                {
                                        result.data=questions
                                        result.description = tag[0].description
                                        return result;
                                }
                                else{
                                        result.errorMessage="No questions found with this Tag"
                                        return [];
                                }
                        }
                        else{
                                result.errorMessage="There is no Question available with the entered tag "+data

                                return result;
                        }

                }
                catch (err) {
                        console.log(err);
                        console.log("Some unexpected error while fethching the questions by tag")
                }

        }


        /*static getQuestionByTag = async (data) => {

                try {
                        let result = {}
                        const tagQuery = {
                                name: data
                        }
                        const tag = await tagModel.find(tagQuery)
                        if(tag.length != 0)
                        {
                                const query = {
                                        "tags": {
                                                $in: tag[0]._id
                                        }
                                }
                                const questions = await QuestionModel.find(query).populate('tags').populate('answer_id');
                                if (questions?.length) {
                                        result.data = questions
                                        return result;
                                }
                                else {
                                        result.errorMessage = "No questions found with this Tag"
                                        return [];
                                }
                        }
                        else {
                                result.errorMessage = "There is no Tag available with the entered text " + data
                                //throw new Error("Some unexpected error occurred with the Tag")

        //                         return result;
        //                 }

                }
                catch (err) {
                        console.log(err);
                        console.log("Some unexpected error while fethching the questions by tag")
                }

        }*/

        static getQuestionByExactmatch = async (data) => {

                try {
                        let searchRegex = new RegExp(`${data}`)
                        const query = {
                                "title": searchRegex
                        }
                        const questions = await QuestionModel.find({
                                $and: [query, {isApproved:true}]});
                        if (questions?.length) {
                                return questions;
                        }
                        else {
                                return [];
                        }

                }
                catch (err) {
                        console.log(err);
                        console.log("Some unexpected error while fethching the questions by search data")
                }
                /*let x;
                x = "This api should give all the questions which matches the text " + data
                return (x)*/
        }

        static getQuestionByAuthor = async (data) => {
                try {
                        let result = {}
                        console.log(data)
                        const query = {
                                "user": data
                        }
                        const questions = await QuestionModel.find({
                                $and: [query, {isApproved:true}]});
                        if (questions?.length) {
                                result.data = questions
                                return result;
                        }
                        else {
                                result.errorMessage = "No questions found with user id " + data
                                return [];
                        }

                }
                catch (err) {
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
                        const questions = await QuestionModel.find({"isApproved":true})
                                .populate('tags', 'name')
                                .populate('user', 'username reputation')   
                                .sort({"createdAt":1});
                        if (questions?.length) {
                                result.data = questions
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

        static addBookmark = async (data) => {
                let result = {}
                let bookmark = await UserModel.updateOne({"_id":data.user}, {$addToSet: {"bookmarks": data.question}})
                if(bookmark)
                {
                        result.updated=true
                        return result
                }
                else
                {
                        return []
                }
        }

        static deleteBookmark = async (data) => {
                let result = {}
                let bookmark = await UserModel.updateOne({"_id":data.user}, {$pull: {"bookmarks": data.question}})
                
                let a =new Date()
                
                if(bookmark)
                {
                        result.updated=true
                        return result
                }
                else
                {
                        return []
                }
        }

        static getAllBookmarkedQuestions = async (data) => {
                let result = {}
                let bookmarkedQuestions = await QuestionModel.find({"_id":{$in : (await UserModel.findById(data.user)).bookmarks}})

                // let bookmarkedQuestions = await UserModel.find({"_id":data.user},{bookmarks:1,_id:0})

                // let questions=bookmarkedQuestions[0].bookmarks
                // console.log(questions)
                // let a = await QuestionModel.find({"_id" : {$in: questions} })
                if(bookmarkedQuestions)
                {
                        result.questions=bookmarkedQuestions
                        return result
                }
                else
                {
                        return []
                }
        }



        static upvoteQuestion = async(data) =>{
                //Updating Question Params
                let question_doc = await QuestionModel.findOne({"_id":data.questionId})
                const upvoteval = question_doc["upvote"]+1
                const  scoreval = upvoteval -  question_doc["downvote"]
                
                //console.log(question_doc)
                // Updating Owner Reputation Params
                let owner_doc = await UserModel.findOne({"questionIds":data.questionId})
                console.log(owner_doc)
                let ownerid = owner_doc["_id"]
                let reputationval = owner_doc["reputation"]+10

                //Adding the activity to history array in user
                const activityQuery = {
                        date: new Date(),
                        what: "upvote",
                        comment: question_doc.title,
                        reputationChanged: "+10"
                }
                const addActivity = new ActivityModel(activityQuery)
                const activity = await addActivity.save()
                const updateUserHistory = await UserModel.findOneAndUpdate({"_id":owner_doc._id},{$push: {history: activity._id}})
        
                //Updating User upvote count
                let user_doc = await UserModel.findOne({"_id":data.userId})
                let upvotegnval = user_doc["upvote_given"]+1


                let score_update = await QuestionModel.findOneAndUpdate({"_id":data.questionId}, {"upvote":upvoteval, "score":scoreval})
                let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerid},{"reputation":reputationval})
                let upvotegn_update = await UserModel.findOneAndUpdate({"_id":data.userId},{"upvote_given":upvotegnval}) 

                return scoreval
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


                //Adding the activity to history array in user
                const activityQuery = {
                        date: new Date(),
                        what: "downvote",
                        comment: question_doc.title,
                        reputationChanged: "-10"
                }
                const addActivity = new ActivityModel(activityQuery)
                const activity = await addActivity.save()
                const updateUserHistory = await UserModel.findOneAndUpdate({"_id":owner_doc._id},{$push: {history: activity._id}})
        


                let score_update = await QuestionModel.findOneAndUpdate({"_id":data.questionId}, {"downvote":downvoteval, "score":scoreval})
                let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerid},{"reputation":reputationval})
                let downvotegn_update = await UserModel.findOneAndUpdate({"_id":data.userId},{"downvote_given":downvotegnval}) 

                return scoreval
        }


        static questionAnalysis = async() =>{
                let result={}
                let data = await CountModel.find()
                if(data?.length)
                {
                        result.data=data;
                        return result;
                }
                else return [];
                }


        static getQuestionById = async (data) => {
                try {
                        let result = {}
                        const question = await QuestionModel.findById(data)
                                                .populate('user', '_id username reputation')
                                                .populate('tags', '_id name')
                                                .populate("comment_id")
                                                .populate({ path: 'answer_id', populate: { path: 'user_id', select: 'username reputation' } })
                                                .populate({ path: 'answer_id', populate: { path: 'comment_id', select:'comment'}})

                        const viewUpdate = await QuestionModel.updateOne({"_id":mongoose.Types.ObjectId(data)}, {$inc:{views:1}})
                        if (question) {
                                result = question
                                return result
                        }
                        else {
                                result.errorMessage = "No questions found with question id " + data
                                return {};
                        }

                } catch (err) {
                        console.log(err);
                        throw new Error("Some unexpected error occurred while getting the questions");
                }
        }


        static search = async(data) => {
                const searchCriteria = data.match(/"[^"]*"|[^\s"]+/g)

                try {
                        let result = []

                        let questions = await QuestionModel.find({"isApproved": true}).select('title body tags user score isApproved createdAt updatedAt answer_id').lean()
                                .populate('tags', '_id name')
                                .populate('answer_id', '_id isBest')
                                .populate('user', '_id username').limit(10)
                        let answers = await AnswerModel.find({}).select('answer question_id isBest score createdAt updatedAt').lean()
                                .populate({ path: 'question_id', populate: { path: 'tags', select: 'name' }, select: 'tags title'})
                                .populate('user_id', '_id username')

                        searchCriteria.forEach(criteria => {
                                if (criteria.substring(0, 3) === 'is:') {
                                        const type = criteria.substring(3, criteria.length)

                                        if (type === 'question') answers = []
                                        else if (type === 'answer') questions = []
                                }
                                else if (criteria.substring(0, 11) === 'isaccepted:') {
                                        const res = criteria.substring(11, criteria.length)

                                        questions = []

                                        if (res === 'yes') answers = answers.filter(answer => answer.isBest)
                                        else if (res === 'no') answers = answers.filter(answer => !answer.isBest)
                                }
                                else if (criteria.charAt(0) === '[' && criteria.charAt(criteria.length - 1) === ']') {
                                        const tag = criteria.substring(1, criteria.length - 1)

                                        questions = questions.filter(question => {
                                                for (const questionTag of question.tags) {
                                                        if (questionTag.name.toLowerCase() === tag.toLowerCase()) return true
                                                }

                                                return false
                                        })

                                        answers = answers.filter(answer => {
                                                for (const questionTag of answer.question_id.tags) {
                                                        if (questionTag.name.toLowerCase() === tag.toLowerCase()) return true
                                                }

                                                return false
                                        })
                                }
                                else if (criteria.substring(0, 5) === 'user:') {
                                        const userID = criteria.substring(5, criteria.length)

                                        questions = questions.filter(question => question.user._id.toString() === userID)

                                        answers = answers.filter(answer => answer.user_id._id.toString() === userID)
                                }
                                else if (criteria.charAt(0) === '"' && criteria.charAt(criteria.length - 1) === '"') {
                                        const exact = criteria.substring(1, criteria.length - 1).toLowerCase()
                                        
                                        questions = questions.filter(question => {
                                                return question.title.toLowerCase().includes(exact) || 
                                                        question.body.toLowerCase().includes(exact)
                                        })

                                        answers = answers.filter(answer => answer.answer.toLowerCase().includes(exact))
                                }
                                else {
                                        const word = criteria

                                        questions = questions.filter(question => {
                                                return question.title.toLowerCase().includes(word) || 
                                                        question.body.toLowerCase().includes(word)
                                        })

                                        answers = answers.filter(answer => answer.answer.toLowerCase().includes(word))
                                }
                        })

                        questions.forEach(question => question.type = 'question')
                        answers.forEach(answer => answer.type = 'answer')

                        result = [...questions, ...answers]

                        return result

                } catch (err) {
                        console.log(err);
                        throw new Error("Some unexpected error occurred while getting the posts");
                }
        }


        static addComment = async (data) => {
                try {
                        let addQuery;
                        
                                 addQuery= {
                                         "comment": data.comment,                                       
                                         "user" : data.user_id,
                                         "question_id" : data.question_id
                                 } 
                         
                         const comment = new CommentsModel(addQuery);
                         const newComment = await comment.save();                    
                         
                         const findQuestionConditionForComment = {
                                 "_id":mongoose.Types.ObjectId(data.question_id)
                                 
                         }                        
 
                         const updateQuestionConditionForComment = {
                                 $push: {"comment_id": newComment._id}
                         }
                         const updateQuestionComment = await QuestionModel.updateOne(findQuestionConditionForComment,updateQuestionConditionForComment)
                
                         const activityQuery = {
                                date: new Date(),
                                what: "comment added",
                                user: data.user_id,
                                comment: data.comment
                        }
                        const addActivity = new ActivityModel(activityQuery)
                        const activity = await addActivity.save()
                        const updateQuestion = await QuestionModel.findOneAndUpdate({"_id":data.question_id},{$push: {activity: activity._id}})

                         return newComment;
                 }
                 catch(err){
                         console.log(err);
                         console.log("Some unexpected error occured while adding Comment")
                 }
 
        }

        static getQuestionsByFilter = async (data) => {

                try {
                         let result={}
                         let filter = data;
                         let questions;
                        
                        if(filter === "Interesting")
                        {       
                                questions = await QuestionModel.find({'isApproved':true}).sort({"updatedAt":1});             
                        }
                        else if(filter === "Hot")
                        {
                                questions = await QuestionModel.find({'isApproved':true}).sort({"todayview":-1})
                        }
                        else if(filter === "Score")
                        {
                                questions = await QuestionModel.find({'isApproved':true}).sort({"score":-1})
                        }
                        else if (filter === "Unanswered")
                        {
                                questions = await QuestionModel.find( {$and:[{'answer_id.0':{ $exists:false  }}, {'isApproved':true}]});
                                console.log("UNANSWERED", questions)
                        }
                     
                         else
                         {
                                result.errorMessage="There is no filter with the entered text "+ data                                 
                         }

                         result.questions = questions;                         
                         return result;
                 }
                 catch (err) {
                         console.log(err);
                         console.log("Some unexpected error while fethching the questions by filter")
                 }

         }

         static updateQuestion = async (_id, data) => {
                try {
                        let query = { 
                                title : data.title,
                                body : data.body,
                                user : data.user,
                                isApproved : true
                        }

                        if(data.body.includes("<img")) {
                             query.isApproved = false
                        }

                        query.modifiedAt = new Date()

                        const result = await QuestionModel.findByIdAndUpdate(_id, query);
                        
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
                         console.log("Some unexpected error occured while updating question")
                 }
 

        }



         static getAllQuestionActivities = async (id) => {
                try {
                        const result = await QuestionModel.find({"_id":id},{activity:1,_id:0}).populate('activity');
                        
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
                         console.log("Some unexpected error occured while updating question")
                 }
 

        }


        static getAdminApprovalQuestions = async () => {
                try {    
                        let result = {}
                        result = await QuestionModel.find({'isApproved':false})
                                              
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
                        console.log("Error occured while getting while searching for admin approval questions")
                }
        }

}





module.exports.Question = Question;