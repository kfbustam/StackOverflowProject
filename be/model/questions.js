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
    isApproved:{
        type:Boolean,
        default:true
    },
    viewdate:{
        type:String,
    },
    todayview:{
        type:Number,
        default:0,
    },
    totalviews:{
        type:Number,
        default:0
    },
    tags: [{ type:mongoose.Schema.Types.ObjectId, ref:"tag" , required: true }],    
    
    answer_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers"
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    comment_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }],
    vote_id: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Votes"
    }],
    upvote:
    {
        type:Number,
        default:0
    },
    downvote:
    {
        type:Number,
        default:0
    },
    score:{
        type:Number,
        default:0   
    },
    
    history:{
        // If needed, create a history model
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Questions',questionsSchema)