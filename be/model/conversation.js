const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
  }],
    lastMessage: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Message"
  },
  lastMessageDate: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
