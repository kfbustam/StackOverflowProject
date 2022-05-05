const { type } = require("express/lib/response");
const User = require("../model/user");


class UserAuth {

        static registerUser = async (data) => {
            //console.log(data)
                try {
                        const query = {
                                email : data.email,
                                password : data.password,
                                username : data.username                                
                        }
                            let foundUser = await User.findOne({"email": query["email"] });
                              if (foundUser) {
                                return false
                              }
                              const newUser = new User({ "email":query["email"], "password":query["password"],"username":query["username"]})
                              await newUser.save()
                              let token = genToken(newUser)
                              return {newUser, "token":token}    
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while registering user")
                }
        }

        static loginUser = async (data) => {
            //console.log(data)
                try {
                        const query = {
                                email : data.email,
                                password : data.password,                             
                        }
                    let foundUser = await User.findOne({"email": query["email"] });
                    if(await foundUser.matchPassword(query["password"]))
                    {
                    let token = genToken(foundUser)
                    console.log(typeof foundUser)
                    console.log(foundUser)
                    return {foundUser, "token":token}
                    }
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging in")
                }
        }
        
        static logoutUser = async (data) => {
            console.log(data)
                try {
                    var temp = await User.findOneAndUpdate({"_id":data.sub}, {"lastSeen":new Date()})
                    return true
                    }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging out")
                }
        }
}

module.exports.UserAuth = UserAuth;