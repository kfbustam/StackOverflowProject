//const { path } = require("d3");
//const { index } = require("d3");
const { type } = require("express/lib/response");

const QuestionModel = require("../model/questions.js")
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

}

module.exports.User = User;