const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = new Schema({
  createdTime: {type: Date, default: Date.now()},
  views: {type: Number, default: 0},
  score: {type: Number, default: 0},
  questionTitle: {type: String, required: true},
  questionTag: { type: String },
  modifiedTime: {type: Date, default: 0},
  count: {type: Number, default: 0},
  user:{type: String,required: true},
  questionDescription: {type: String, required:true}

  },
  {
      versionKey: false
  });

questionSchema.set('toObject', { virtuals: true })
questionSchema.set('toJSON', { virtuals: true })


questionSchema.virtual('id').get(function() {
  return this._id.toString();
});

const questionModel = mongoose.model('question', questionSchema);
module.exports = questionModel;