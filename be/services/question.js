// const { reject } = require("bcrypt/promises");
// const { type } = require("express/lib/response");
// const con = require("../db");


const Questions = require("../model/questions");
const answerTableName = "answer";


class Question {

        static addQuestion = async (data) => {
                try {
                        const query = {
                                questionTitle : data.questionTitle,
                                questionTag : data.questionTag,
                                questionDescription : data.questionDescription,
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
                        const query = {
                                "questionTag": data
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
                                "questionTitle": searchRegex
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
                        const query = {
                                "user": data
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