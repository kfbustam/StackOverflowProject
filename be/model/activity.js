const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    what: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reputationChanged: { type: String },
    comment: { type: String, required: true }
  }
);
module.exports = mongoose.model('activity', activitySchema);