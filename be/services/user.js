//const { path } = require("d3");
//const { index } = require("d3");
const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const { array } = require("../common.js");

const QuestionModel = require("../model/questions.js")
const AnswerModel = require("../model/answers.js")
const UserModel = require("../model/user");
const TagModel = require("../model/tag");

const res = require("express/lib/response");

class User {
       

        static getPopularUsers = async (data) => {
                try {                        
                        const result = await UserModel.find({}).sort({"reputation":-1});
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
                        const result = await UserModel.find({}).sort({"createdAt":1});
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
                        const result = await UserModel.find({username:{$regex: regex}}).limit(5);
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

        static top10Results = async () => {
                try {    
                        let result = {}
                        let top10Questions = await QuestionModel.find({}).sort({"views":-1}).limit(10);
                        let top10Tags = await TagModel.find({}).sort({"count":-1}).limit(10);
                        let top10Users_high_reputation = await UserModel.find({},{username:1,reputation:1,_id:0}).sort({"reputation":-1}).limit(10);
                        let top10Users_low_reputation = await UserModel.find({},{username:1,reputation:1,_id:0}).sort({"reputation":1}).limit(10);

                        result = {
                                // "top10Questions" : top10Questions,
                                "top10Tags" : top10Tags,
                                "top10Users_high_reputation": top10Users_high_reputation,
                                "top10Users_low_reputation": top10Users_low_reputation
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
                        console.log("Error occured while getting while  searching users")
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
                        let views=0;
                        //checking conditions if tags can become the badges or not.
                        userDetails.questionIds.forEach(question => {
                                let tags=question.tags;
                                if(question.views>views)
                                {
                                        views = question.views;
                                }
                                tags.forEach(tag => {
                                        if(tagData.includes(tag.name))
                                        {
                                              let ind=tagData.indexOf(tag.name);
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
                                let badge
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
                        //Badges based on views of the question.
                        if(views>5)
                        {
                                badge={
                                        'badgeName': 'Notable Question',
                                        'type': 'Gold',
                                }
                                badges.push(badge)
                        }
                        else if(views > 15)
                        {
                                badge={
                                        'badgeName': 'Notable Question',
                                        'type': 'Gold',
                                }
                                badges.push(badge)

                                badge={
                                        'badgeName': 'Famous Question',
                                        'type': 'Gold',
                                }
                                badges.push(badge)
                        }


                        //Badges based on no of questions asked. "Curious"
                        let badge;
                        if(userDetails.questionIds.length <= 2)
                        {
                                badge={
                                        'badgeName': 'Curious',
                                        'type': 'Bronze',
                                        'score': userDetails.questionIds.length
                                }
                        }
                        else if(userDetails.questionIds.length > 2 && userDetails.questionIds.length <5)
                        {
                                badge={
                                        'badgeName': 'Curious',
                                        'type': 'Silver',
                                        'score': userDetails.questionIds.length
                                }
                        }
                        else if(userDetails.questionIds.length>=5)
                        {
                                badge={
                                        'badgeName': 'Curious',
                                        'type': 'Gold',
                                        'score': userDetails.questionIds.length
                                }  
                        }

                        badges.push(badge)


                        //Badges based on no of answers asked. ("Helpfulness")
                        if(userDetails.answerIds.length <= 2)
                        {
                                badge={
                                        'badgeName': 'Helpfulness',
                                        'type': 'Bronze',
                                        'score': userDetails.answerIds.length
                                }
                        }
                        else if(userDetails.answerIds.length > 2 && userDetails.answerIds.length <5)
                        {
                                badge={
                                        'badgeName': 'Helpfulness',
                                        'type': 'Silver',
                                        'score': userDetails.answerIds.length
                                }
                        }
                        else if(userDetails.answerIds.length>=5)
                        {
                                badge={
                                        'badgeName': 'Helpfulness',
                                        'type': 'Gold',
                                        'score': userDetails.answerIds.length
                                }  
                        }

                        badges.push(badge)


                        //Badges based on popularity
                        if(userDetails.reputation<=10)
                        {
                                badge={
                                        'badgeName': 'Popular',
                                        'type': 'Bronze',
                                        'score': userDetails.reputation
                                } 
                        }
                        else if(userDetails.reputation>10 && userDetails.reputation<15)
                        {
                                badge={
                                        'badgeName': 'Popular',
                                        'type': 'Silver',
                                        'score': userDetails.reputation
                                } 
                        }
                        else if(userDetails.reputation>=15)
                        {
                                badge={
                                        'badgeName': 'Popular',
                                        'type': 'Gold',
                                        'score': userDetails.reputation
                                } 
                        }
                        badges.push(badge)

                        //badges based on upvotes 'sportsmanship'
                        if(userDetails.upvote_given <= 2)
                        {
                                badge={
                                        'badgeName': 'Sportsmanship',
                                        'type': 'Bronze',
                                        'score': userDetails.upvote_given
                                } 
                        }
                        else if(userDetails.upvote_given > 2 && userDetails.upvote_given <5)
                        {
                                badge={
                                        'badgeName': 'Sportsmanship',
                                        'type': 'Silver',
                                        'score': userDetails.upvote_given
                                } 
                        }
                        else if(userDetails.upvote_given>=5)
                        {
                                badge={
                                        'badgeName': 'Sportsmanship',
                                        'type': 'Gold',
                                        'score': userDetails.upvote_given
                                } 
                        }
                        badges.push(badge)


                        //based on down votes 'critic'
                        if(userDetails.downvote_given <= 2)
                        {
                                badge={
                                        'badgeName': 'Critic',
                                        'type': 'Bronze',
                                        'score': userDetails.downvote_given
                                } 
                        }
                        else if(userDetails.downvote_given > 2 && userDetails.downvote_given <5)
                        {
                                badge={
                                        'badgeName': 'Critic',
                                        'type': 'Silver',
                                        'score': userDetails.downvote_given
                                } 
                        }
                        else if(userDetails.downvote_given>=5)
                        {
                                badge={
                                        'badgeName': 'Critic',
                                        'type': 'Gold',
                                        'score': userDetails.downvote_given
                                } 
                        }
                        badges.push(badge)

                        //adding badges based on comments 'Pundit'
                        if(userDetails.comments.length>=3)
                        {
                                badge={
                                        'badgeName': 'Pundit',
                                        'type': 'Silver',
                                } 
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

        static getQuestionsTab = async (data) => {
                try {    
                        let result = []
                        let question_doc = await UserModel.findOne({"_id":mongoose.Types.ObjectId(data)})
                                                        .populate([{ path: 'questionIds', populate: { path: 'tags'}}])
                        console.log(question_doc)
                        question_doc["questionIds"].forEach(element=>{
                                let every_ques = {}
                                let tags = []
                                every_ques["askedDate"] = element["createdAt"]
                                every_ques["admin_approval"] = element["isApproved"]
                                if(element["best_ans"])
                                {
                                        every_ques["isAccepted"] = true
                                }
                                else{
                                        every_ques["isAccepted"] = false
                                }
                                every_ques["numOfVotes"] = element["upvote"] + element["downvote"]
                                every_ques["questionTitle"] = element["title"]
                                every_ques["questionId"] = element["_id"]
                                element["tags"].forEach(e=>{
                                        tags.push({
                                                "name":e["name"],
                                                "tag_id":e["_id"]
                                        })
                                })
                                every_ques["tags"] = tags
                                result.push(every_ques)
                                })

                        return result
                }
                catch(err){
                        console.log(err);
                        console.log("Error occured while getting the question tab of the user")
                }
        }


}

module.exports.User = User;