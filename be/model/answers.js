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
        required:true
    },
    comment_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }],
    isBest:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });


module.exports = mongoose.model('Answers',answersSchema)