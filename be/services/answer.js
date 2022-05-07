var mongoose = require('mongoose');
const AnswerModel = require("../model/answers.js");
const TagModel = require("../model/tag.js")
const QuestionModel = require('../model/questions.js')
const UserModel = require('../model/user')

class Answer {

    static addAnswer = async (data) => {
        try {
            const query = {
                question_id: data.question_id,
                answer: data.answer,
                user_id: data.user_id,

            }
            const answer = new AnswerModel(query);
            const result = await answer.save();

            if (result) {
                const question = await QuestionModel.findOneAndUpdate({ _id: query.question_id }, { $push: { answer_id: result._id }})

                if (question) {
                    const user = await UserModel.findOneAndUpdate({ _id: query.user_id }, { $push: { answerIds: result._id }})

                    if (user) return result
                    else return {}
                }
                else return {}         
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