const { type } = require("express/lib/response");


const UserModel = require("../model/user");
const TagModel = require("../model/tag");
const QuestionModel = require("../model/questions");
const res = require("express/lib/response");

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

        static top10Results = async () => {
                try {    
                        let result = {}
                        let top10Questions = await QuestionModel.find({}).sort({"views":-1}).limit(10);
                        let top10Tags = await TagModel.find({}).sort({"count":-1}).limit(10);
                        let top10Users_high_reputation = await UserModel.find({}).sort({"reputation":-1}).limit(10);
                        let top10Users_low_reputation = await UserModel.find({}).sort({"reputation":1}).limit(10);

                        result = {
                                "top10Questions" : top10Questions,
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



}

module.exports.User = User;