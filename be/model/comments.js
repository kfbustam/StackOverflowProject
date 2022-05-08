const  mongoose = require('mongoose')
const commentsSchema = new mongoose.Schema({    

    comment: String, 

    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"questions"
    },  
    answer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers"
    },       
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    
}, { timestamps: true });


module.exports = mongoose.model('Comments',commentsSchema)