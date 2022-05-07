const  mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },
  username:{
    type: String,
    default:null,
  },
  upvote_given:{
    type:Number,
    default:0
  },
  downvote_given:{
    type:Number,
    default:0
  },
  reputation:{
    type:Number,
    default:0
  },
  profileURL:{
    type:String
  },
  about:{
    type:String
  },
  memberFrom:{
    type:Date,
    default:Date.now,
  },
  lastSeen:{
    type:Date
  },
  location:{  
    type:String
  },
  questionIds:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"questions"
  }],
  answerIds:{
    type:[String]
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comments"
  }],
  bookmarks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Questions"
  }]
}, { timestamps: true });

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
module.exports = mongoose.model('User',UserSchema)