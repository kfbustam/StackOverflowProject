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

    static upvoteAnswer = async(data) =>{
        //Updating Question Params
        let answer_doc = await AnswerModel.findOne({"_id":data.answerId})
        const upvoteval = answer_doc["upvote"]+1
        const  scoreval = upvoteval -  answer_doc["downvote"]
        
        // Updating Owner Reputation Params
        let owner_doc = await UserModel.findOne({"_id":answer_doc.user_id})
        //console.log(owner_doc)
        let ownerid = answer_doc.user_id
        let reputationval = owner_doc["reputation"]+5


        //Updating User upvote count
        let user_doc = await UserModel.findOne({"_id":data.userId})
        let upvotegnval = user_doc["upvote_given"]+1


        let score_update = await AnswerModel.findOneAndUpdate({"_id":data.answerId}, {"upvote":upvoteval,"score":scoreval})
        let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerid},{"reputation":reputationval})
        let upvotegn_update = await UserModel.findOneAndUpdate({"_id":data.userId},{"upvote_given":upvotegnval}) 

        return {"score":scoreval}
    }


    static downvoteAnswer = async(data) =>{
        //Updating Question Params
        let answer_doc = await AnswerModel.findOne({"_id":data.answerId})
        const downvoteval = answer_doc["downvote"]+1
        const scoreval = answer_doc["upvote"] - downvoteval 
        
        // Updating Owner Reputation Params
        let owner_doc = await UserModel.findOne({"_id":answer_doc.user_id})
        let ownerid = answer_doc.user_id
        let reputationval = owner_doc["reputation"]-5


        //Updating User upvote count
        let user_doc = await UserModel.findOne({"_id":data.userId})
        let downvotegnval = user_doc["downvote_given"]+1


        let score_update = await AnswerModel.findOneAndUpdate({"_id":data.answerId}, {"downvote":downvoteval, "score":scoreval})
        let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerid},{"reputation":reputationval})
        let upvotegn_update = await UserModel.findOneAndUpdate({"_id":data.userId},{"downvote_given":downvotegnval}) 

        return {"score":scoreval}
    }

    static bestAnswer = async(data) =>{
        let answer_doc = await AnswerModel.findOne({"_id":data.answerId})
        const ownerId = answer_doc.user_id
        const questionId = answer_doc.question_id

        let question_doc = await QuestionModel.findOne({"_id":questionId})
        console.log(question_doc)
        if(question_doc["best_ans"])
        {
            console.log("Current BestAns")
            let current_bestans = await AnswerModel.findOneAndUpdate({"_id":data.answerId}, {"isBest":false})
            let current_bestans_user = await UserModel.findOne({"_id":current_bestans.user_id})
            let decrement_reputation = current_bestans_user["reputation"]-15
            console.log("Current BestAns")
            console.log(decrement_reputation)
            let updated_reputation = await UserModel.findOneAndUpdate({"_id":current_bestans.user_id},{"reputation":decrement_reputation})
        }

        //Updating User upvote count
        let user_doc = await UserModel.findOne({"_id":ownerId})
        let reputationval = user_doc["reputation"]+15
        console.log("New Best Ans")
        console.log(reputationval)

        let score_update = await QuestionModel.findOneAndUpdate({"_id":questionId}, {"best_ans":mongoose.Types.ObjectId(data.answerId)})
        let reputation_update = await UserModel.findOneAndUpdate({"_id":ownerId},{"reputation":reputationval})
        let makebest = await AnswerModel.findOneAndUpdate({"_id":data.answerId}, {"isBest":true})
        return {}
    }

}


module.exports.Answer = Answer;