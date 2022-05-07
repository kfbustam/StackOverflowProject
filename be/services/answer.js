var mongoose = require('mongoose');
const AnswerModel = require("../model/answers.js");
const TagModel = require("../model/tag.js")
const CommentsModel = require("../model/comments.js")

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


    static addComment = async (data) => {
        try {
                let addQuery;
                
                         addQuery= {
                                 "comment": data.comment,                                       
                                 "user" : data.user_id,
                                 "answer_id" : data.answer_id
                         } 
                 
                 const comment = new CommentsModel(addQuery);
                 const newComment = await comment.save();                    
                 
                 const findAnswerConditionForComment = {
                         "_id":mongoose.Types.ObjectId(data.answer_id)
                         
                 }                        

                 const updateAnswerConditionForComment = {
                         $push: {"comment_id": newComment._id}
                 }
                 console.log("PUSHing value",newComment._id);

                 const updateAnswerComment = await AnswerModel.updateOne(findAnswerConditionForComment,updateAnswerConditionForComment)
        
                 return newComment;
         }
         catch(err){
                 console.log(err);
                 console.log("Some unexpected error occured while adding Comment")
         }

}

}


module.exports.Answer = Answer;