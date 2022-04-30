const  mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
    title:  { type: String, required: true },
    body: { type: String, required: true },
    score: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    body_image: {
        type:String,
        default:null
    },     
    tags: [{ type: String, required: true }],    
    
    answer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    },
    vote_id: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Votes"
    }],
    
}, { timestamps: true });

module.exports = mongoose.model('Questions',questionsSchema)