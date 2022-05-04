var mongoose = require('mongoose');
const QuestionModel = require("../model/questions.js");
const tagModel = require('../model/tag.js');
const TagModel = require("../model/tag.js")
const UserModel = require("../model/user.js")
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
                        console.log(updateUser)

                        //While adding the question, checking which tags are present and updating those tags totalCount, todayCount and weekCount
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
                                        const countResult = await tagModel.updateOne(findCondition,updateCondition);
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
                                        const countResult = await tagModel.updateOne(findCondition,updateCondition);

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
                                        const countResult = await tagModel.updateOne(findCondition,updateCondition);
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
                                        const countResult = await tagModel.updateOne(findCondition,updateCondition);

                                }
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
                        const questions = await QuestionModel.find({});
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


}



module.exports.Question = Question;