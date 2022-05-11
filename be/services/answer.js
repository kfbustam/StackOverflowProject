var mongoose = require('mongoose');
const AnswerModel = require("../model/answers.js");
const TagModel = require("../model/tag.js")
const CommentsModel = require("../model/comments.js")
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
                const question = await QuestionModel.findOneAndUpdate({ _id: query.question_id }, { $push: { answer_id: result._id } })

                if (question) {
                    const user = await UserModel.findOneAndUpdate({ _id: query.user_id }, { $push: { answerIds: result._id } })

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

    static getAllAnswers = async(data) => {
        try {
            let result = {}
            const answers = await AnswerModel.find({question_id: data});
            if (answers?.length) {
                result.data = answers
                return result;
            } else {
                return [];
            }

        } catch (err) {
            console.log(err);
            throw new Error("Some unexpected error occurred while getting the questions");
        }


    }

    static upvoteAnswer = async (data) => {
        //Sample Request Params {"answerId": "","userId":""}

        //Updating Question Params
        let answer_doc = await AnswerModel.findOne({ "_id": data.answerId })
        const upvoteval = answer_doc["upvote"] + 1
        const scoreval = upvoteval - answer_doc["downvote"]

        // Updating Owner Reputation Params
        let owner_doc = await UserModel.findOne({ "_id": answer_doc.user_id })
        //console.log(owner_doc)
        let ownerid = answer_doc.user_id
        let reputationval = owner_doc["reputation"] + 5


        //Updating User upvote count
        let user_doc = await UserModel.findOne({ "_id": data.userId })
        let upvotegnval = user_doc["upvote_given"] + 1

        //Adding the activity to history array in user
        const activityQuery = {
            date: new Date(),
            what: "upvote",
            comment: answer_doc.answer,
            reputationChanged: "+5"
        }
        const addActivity = new ActivityModel(activityQuery)
        const activity = await addActivity.save()
        const updateUserHistory = await UserModel.findOneAndUpdate({ "_id": owner_doc._id }, { $push: { history: activity._id } })


        let score_update = await AnswerModel.findOneAndUpdate({ "_id": data.answerId }, { "upvote": upvoteval, "score": scoreval })
        let reputation_update = await UserModel.findOneAndUpdate({ "_id": ownerid }, { "reputation": reputationval })
        let upvotegn_update = await UserModel.findOneAndUpdate({ "_id": data.userId }, { "upvote_given": upvotegnval })

        return scoreval
    }


    static downvoteAnswer = async (data) => {
        //Sample Request Params {"answerId": "","userId":""}

        //Updating Question Params
        let answer_doc = await AnswerModel.findOne({ "_id": data.answerId })
        const downvoteval = answer_doc["downvote"] + 1
        const scoreval = answer_doc["upvote"] - downvoteval

        // Updating Owner Reputation Params
        let owner_doc = await UserModel.findOne({ "_id": answer_doc.user_id })
        let ownerid = answer_doc.user_id
        let reputationval = owner_doc["reputation"] - 5

        //Updating User upvote count
        let user_doc = await UserModel.findOne({ "_id": data.userId })
        let downvotegnval = user_doc["downvote_given"] + 1

        //Adding the activity to history array in user
        const activityQuery = {
            date: new Date(),
            what: "downvote",
            comment: answer_doc.answer,
            reputationChanged: "-5"
        }
        const addActivity = new ActivityModel(activityQuery)
        const activity = await addActivity.save()
        const updateUserHistory = await UserModel.findOneAndUpdate({ "_id": owner_doc._id }, { $push: { history: activity._id } })


        let score_update = await AnswerModel.findOneAndUpdate({ "_id": data.answerId }, { "downvote": downvoteval, "score": scoreval })
        let reputation_update = await UserModel.findOneAndUpdate({ "_id": ownerid }, { "reputation": reputationval })
        let upvotegn_update = await UserModel.findOneAndUpdate({ "_id": data.userId }, { "downvote_given": downvotegnval })

        return scoreval
    }

    static bestAnswer = async (data) => {
        //Sample params: {"answerId":""}

        let answer_doc = await AnswerModel.findOne({ "_id": data.answerId })
        const ownerId = answer_doc.user_id
        const questionId = answer_doc.question_id

        let question_doc = await QuestionModel.findOne({ "_id": questionId })
        //console.log(question_doc)
        if (question_doc["best_ans"]) {

            let current_bestans = await AnswerModel.findOneAndUpdate({ "_id": question_doc["best_ans"] }, { "isBest": false })
            let current_bestans_user = await UserModel.findOne({ "_id": current_bestans.user_id })
            let decrement_reputation = current_bestans_user["reputation"] - 15
            let updated_reputation = await UserModel.findOneAndUpdate({ "_id": current_bestans.user_id }, { "reputation": decrement_reputation })

            //Adding the activity to history array in old user that reputation decreased by -15
            const activityQuery = {
                date: new Date(),
                what: "removed the best answer",
                comment: question_doc.title,
                reputationChanged: "-15"
            }
            const addActivity = new ActivityModel(activityQuery)
            const activity = await addActivity.save()
            const updateUserHistory = await UserModel.findOneAndUpdate({ "_id": current_bestans_user._id }, { $push: { history: activity._id } })

        }

        //Updating User upvote count
        let user_doc = await UserModel.findOne({ "_id": ownerId })
        let reputationval = user_doc["reputation"] + 15


        let score_update = await QuestionModel.findOneAndUpdate({ "_id": questionId }, { "best_ans": mongoose.Types.ObjectId(data.answerId) })
        let reputation_update = await UserModel.findOneAndUpdate({ "_id": ownerId }, { "reputation": reputationval })
        let makebest = await AnswerModel.findOneAndUpdate({ "_id": data.answerId }, { "isBest": true })

        //Adding the activity to history array in old user that reputation decreased by -15
        const activityQuery = {
            date: new Date(),
            what: "Made the answer as a best answer",
            comment: question_doc.title,
            reputationChanged: "+15"
        }
        const addActivity = new ActivityModel(activityQuery)
        const activity = await addActivity.save()
        const updateUserHistory = await UserModel.findOneAndUpdate({ "_id": current_bestans_user._id }, { $push: { history: activity._id } })


        return {}
    }

    static addComment = async (data) => {
        try {
            let addQuery;
            addQuery = {
                "comment": data.comment,
                "user": data.user_id,
                "answer_id": data.answer_id
            }
            const comment = new CommentsModel(addQuery);
            const newComment = await comment.save();
            const findAnswerConditionForComment = {
                "_id": mongoose.Types.ObjectId(data.answer_id)

            }

            const updateAnswerConditionForComment = {
                $push: { "comment_id": newComment._id }
            }

            const updateAnswerComment = await AnswerModel.updateOne(findAnswerConditionForComment, updateAnswerConditionForComment)

            return newComment;
        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while adding Comment")
        }

    }

}


module.exports.Answer = Answer;