var mongoose = require('mongoose');
const QuestionModel = require("../model/questions.js");
const tagModel = require('../model/tag.js');
const UserModel = require('../model/user.js')
//const TagModel = require("../model/tag.js")
const { DateTime } = require("luxon");
const CountModel = require("../model/count.js");
const AnswerModel = require('../model/answers')

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
                         //measuring count of questions
                         const countData = await CountModel.find({"date":new Date().toDateString()})
                        if(countData?.length)
                        {

                                if(countData[0].date === new Date().toDateString())
                                {
                                        const updateCount = await CountModel.updateOne({"_id":countData[0]._id},{$inc:{"count":1}})

                                }
                                else
                                {
                                        const addCountCondition = {
                                                date: new Date().toDateString(),
                                                 count:1
                                                }        
                                        
                                        const addCount = new CountModel(addCountCondition)
                                        const result = await addCount.save()
                                }
                                
                        }
                        else
                        {
                                const addCountQuery = {
                                        date: new Date().toDateString(),
                                        count: 1
                                }
                                const addCount = new CountModel(addCountQuery);
                                const result = await addCount.save();
                        }

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
                        if(tag.length != 0)
                        {
                                const query = {
                                        "tags": {
                                                $in:tag[0]._id
                                        }
                                }
                                const questions = await QuestionModel.find(query).populate('tags', 'name')
                                        .populate('user', 'username reputation');
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

                                return result;
                        }

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
                        const questions = await QuestionModel.find(query);
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
                        const questions = await QuestionModel.find(query);
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
                        const questions = await QuestionModel.find({})
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

        static upvoteQuestion = async(data) =>{
                let qtemp = await QuestionModel.findOne({"_id":data.questionId})
                let upvoteval = qtemp["upvote"]+1
                let scoreval = upvoteval -  qtemp["downvote"]
                let usertemp = await UserModel.findOne({"questionIds":data.questionId})
                console.log(upvoteval)
                console.log(scoreval)
                console.log(usertemp)
                //let temp2 = await QuestionModel.findOneAndUpdate({"_id":data.questionId}, {"upvote":upvoteval, "score":scoreval})
                return "Done"
        }

        static questionAnalysis = async() =>{
                let result={}
                let data = await CountModel.find()
                console.log(data)

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
                                                .populate({ path: 'answer_id', populate: { path: 'user_id', select: 'username reputation' } , })

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

                        let questions = await QuestionModel.find({}).select('title body tags user score createdAt updatedAt answer_id').lean()
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

}



module.exports.Question = Question;