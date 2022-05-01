const { type } = require("express/lib/response");


const tagModel = require("../model/tag");

class Tag {

        static addTag = async (data) => {
                try {
                        const query = {
                                name : data.name,
                                description : data.description                                
                        }
                        const tag = new tagModel(query);
                        const result = tag.save();
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
                        console.log("Some unexpected error occured while adding tag")
                }
        }


        static getPopularTags = async (data) => {
                try {                        
                        const result = tagModel.find({}).sort({"count":-1});
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
                        console.log("Some unexpected error occured while displaying popular tag")
                }
        }

        static getNewTags = async (data) => {
                try {                        
                        const result = tagModel.find({}).sort({"createdAt":1});
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
                        console.log("Some unexpected error occured while getting new tag")
                }
        }

        static getNameTags = async (data) => {
                try {                        
                        const result = tagModel.find({}).sort({"name":1});
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
                        console.log("Some unexpected error occured while getting tags in alphabetical order")
                }
        }

        static searchTags = async (data) => {
                try {    
                        let searchValue = data.searchValue;  
                        const regex = new RegExp(searchValue,'i')                  
                        const result = tagModel.find({name:{$regex: regex}}).limit(5);
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
                        console.log("Error occured while getting while searching tags")
                }
        }
}

module.exports.Tag = Tag;