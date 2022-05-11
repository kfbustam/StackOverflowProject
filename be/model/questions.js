const  mongoose = require('mongoose');
const { DateTime } = require("luxon");


const questionsSchema = new mongoose.Schema({
    title:  { type: String, required: true },
    body: { type: String, required: true },
    score: { type: Number, default: 0 },
    //views: { type: Number, default: 0 },

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
        default: new Date().getDate()
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
    best_ans : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers",
        default:null
    },    
    answer_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers",
        default:null
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
    comment_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }],
    vote_id: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Votes",
        default:null
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
    modifiedAt: { type: Date },
    activity: [{ type:mongoose.Schema.Types.ObjectId, ref:"activity"}],
}, { timestamps: true });

module.exports = mongoose.model('questions',questionsSchema)