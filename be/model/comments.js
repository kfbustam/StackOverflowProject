const  mongoose = require('mongoose')
const commentsSchema = new mongoose.Schema({    

    comment: String, 

    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },       
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    
}, { timestamps: true });


module.exports = mongoose.model('Comments',commentsSchema)