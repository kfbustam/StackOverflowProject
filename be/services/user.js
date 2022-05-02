const { type } = require("express/lib/response");


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

}

module.exports.User = User;