const  mongoose = require('mongoose')
const answersSchema = new mongoose.Schema({

    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },
    answer: String,
    tags: [{ type: String, required: true }], 
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    },
}, { timestamps: true });


module.exports = mongoose.model('Answers',answersSchema)