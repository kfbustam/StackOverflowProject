const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    date: {type: String, required: true} ,
    what: { type: Number, required: true },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Comment: {type: String, required: true}
  }
);

module.exports = mongoose.model('activity',activitySchema)