const mongoose = require('mongoose');

const voteSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    vote: { type: Number, required: true }
  },
);

module.exports = mongoose.model('Votes',voteSchema)