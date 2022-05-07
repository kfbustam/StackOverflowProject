const mongoose = require('mongoose');

const countSchema = new mongoose.Schema(
  {
    date: {type: String, required: true} ,
    count: { type: Number, required: true }
  }
);

module.exports = mongoose.model('Count',countSchema)