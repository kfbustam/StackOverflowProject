var mongoose = require('mongoose');
const AnswerModel = require("../model/answers.js");
const TagModel = require("../model/tag.js")

class Answer {

    static addAnswer = async (data) => {
        try {
            const query = {
                question_id: data.question_id,
                answer: data.answer,
                user_id: data.user_id,

            }
            const answer = new AnswerModel(query);
            const result = answer.save();
            if (result) {
                return result;
            }
            else {
                return {};
            }


        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while adding question")
        }

    }

    static getAllAnswers = async (data) => {
        try {
            let result={}

            const answers = await AnswerModel.find({});
            if (answers?.length) {
                result.data=answers
                return result;
            } else {
                return [];
            }

        } catch (err) {
            console.log(err);
            throw new Error("Some unexpected error occurred while getting the questions");
        }


    }

}


module.exports.Answer = Answer;