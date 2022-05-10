const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    what: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reputationIncreased: { type: Number },
    comment: { type: String, required: true }
  }
);
module.exports = mongoose.model('activity', activitySchema);