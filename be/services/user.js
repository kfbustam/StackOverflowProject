//const { path } = require("d3");
//const { index } = require("d3");
const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const { array } = require("../common.js");

const QuestionModel = require("../model/questions.js")
const AnswerModel = require("../model/answers.js")
const UserModel = require("../model/user");

class User {
       

        static getPopularUsers = async (data) => {
                try {                        
                        const result = UserModel.find({}).sort({"reputation":-1});
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
                        console.log("Some unexpected error occured while displaying popular User")
                }
        }

        static getNewUsers = async (data) => {
                try {                        
                        const result = UserModel.find({}).sort({"createdAt":1});
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
                        console.log("Some unexpected error occured while getting new Users")
                }
        }

        static searchUsers = async (data) => {
                try {    
                        let searchValue = data.searchValue;  
                        const regex = new RegExp(searchValue,'i')                  
                        const result = UserModel.find({username:{$regex: regex}}).limit(5);
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
                        console.log("Error occured while getting while  searching users")
                }
        }

        static updateLocation = async (decoded, data) => {
                try {    
                        var temp = await UserModel.findOneAndUpdate({"_id":decoded.sub}, {"location":data["location"]})
                        return await UserModel.findOne({"_id":decoded.sub})
                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while getting while updating location of the user")
                }
        }
        static getBasicDetails = async (decoded) => {
                try {    
                        var temp = await UserModel.findOne({"_id":decoded.sub})
                        return temp
                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while getting while getting the details of the user")
                }
        }

        static getAllBadges = async(data) => {
                try{
                        let result = {}
                        const userDetails=await UserModel.findById(data).
                        populate({path:'questionIds', populate:{path: 'tags', select: 'name'} })
                        let tagData=[]
                        let score=[]
                        let badges=[]
                        userDetails.questionIds.forEach(question => {
                                let tags=question.tags;
                                tags.forEach(tag => {
                                        if(tagData.includes(tag.name))
                                        {
                                              ind=tagData.indexOf(tag.name);
                                              score[ind]=score[ind]+question.score;
                                        }
                                        else
                                        {
                                                tagData.push(tag.name)
                                                score.push(question.score)
                                        }
                                        
                                });                                
                        });

                        for(let i=0;i<tagData.length;i++)
                        {
                                let badge;
                                if(score[i]<=10)
                                {
                                        badge={
                                                'badgeName': tagData[i],
                                                'type': 'Bronze',
                                                'score': score[i]
                                        }

                                }
                                else if(score[i]>10 && score[i]<=15)
                                {
                                        badge={
                                                'badgeName': tagData[i],
                                                'type': 'Silver',
                                                'score': score[i]
                                        }
                                }
                                else if(score[i]>20)
                                {
                                        badge={
                                                'badgeName': tagData[i],
                                                'type': 'Gold',
                                                'score': score[i]
                                        }
                                }
                                badges.push(badge)

                        }
                        
                        return result=badges;
                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while getting all the badges.")
                }
        }

        static getProfileTab =  async(data) =>{
                try{

                        const topGoldTags = [
                                {name: 'Autobiographer', createDate: 'Nov 7'},
                                {name: 'Legendary', createDate: 'Nov 7'},
                                {name: 'Dataframe', createDate: 'Nov 7'}
                              ]
                        let result = {}
                        let user_doc = await UserModel.findOne({"_id":mongoose.Types.ObjectId(data)}).populate("questionIds")
                        let qreached = 0
                        //console.log(user_doc)
                        if (user_doc["questionIds"].length>0)
                        {
                                user_doc["questionIds"].forEach(e=>{
                                        //console.log(e["totalviews"])
                                        qreached =qreached+e["totalviews"]
                                })
                        }
                        let stats = {
                                "reputationCount" : user_doc["reputation"],
                                "answersCount": user_doc["answerIds"].length,
                                "questionsCount" : user_doc["questionIds"].length,
                                "reachedCount": qreached
                        }
                        let about = user_doc["about"]
                        return {
                                "stats":stats,
                                "aboutMeText":about,
                                "badges":{
                                        "topGoldTags":topGoldTags,
                                        "topSilverTags":topGoldTags,
                                        "topBronzeTags":topGoldTags
                                }
                        }

                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while getting the details of user profile tab.")
                }
        }

        static editAbout = async (data) => {
                try {    
                        var user_doc = await UserModel.findOneAndUpdate({"_id":data.userId}, {"about":data.about})
                        return await UserModel.findOne({"_id":data.userId})
                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while updating about of the user")
                }
        }

        static getAnswersTab = async (data) => {
                try {    
                        let result = []
                        let answer_doc = await UserModel.findOne({"_id":mongoose.Types.ObjectId(data)})
                                                        .populate([{ path: 'answerIds', populate: { path: 'question_id', populate:{path:'tags'} }}])
                        answer_doc["answerIds"].forEach(element=>{
                                let every_answer = {}
                                let tags = []
                                every_answer["answeredDate"] = element["createdAt"]
                                every_answer["isAccepted"] = element["isBest"]
                                every_answer["numOfVotes"] = element["question_id"]["upvote"] + element["question_id"]["downvote"]
                                every_answer["questionTitle"] = element["question_id"]["title"]
                                every_answer["questionId"] = element["question_id"]["_id"]
                                element["question_id"]["tags"].forEach(e=>{
                                        tags.push({
                                                "name":e["name"],
                                                "tag_id":e["_id"]
                                        })
                                })
                                every_answer["tags"] = tags
                                result.push(every_answer)
                                })

                        return result
                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while getting the answers tab of the user")
                }
        }


}

module.exports.User = User;