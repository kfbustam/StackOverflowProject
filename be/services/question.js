var mongoose = require('mongoose');
const QuestionModel = require("../model/questions.js");
const TagModel = require("../model/tag.js")

class Question {

        static addQuestion = async (data) => {
                try {
                        const query = {
                                title : data.title,
                                tags : data.tags,
                                body : data.body,
                                user : data.user
                        }
                        const question = new QuestionModel(query);
                        const result = question.save();
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
                                console.log("erri pook")

                                const query = {
                                        "tags": {
                                                $in:tag[0]._id
                                        }
                                }
                                const questions = await QuestionModel.find(query);
                                if(questions?.length)
                                {
                                        result.questions=questions
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
                        console.log(questions)

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
                                result.questions=questions
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

        static getQuestionByType = async (data) => {
                let x;

                x = "This api should give all the questions or answers based on the type " + data
                return (x)
        }

        static getQuestionByAcceptance = async (data) => {
                let x;

                x = "This api should give all the questions or answers based on the acceptance type " + data
                return (x)
        }


}



module.exports.Question = Question;