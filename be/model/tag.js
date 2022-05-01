const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");


var tagSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  count: { 
    type: Number,
    default: 0 
  },

  todaydate:{
    type:String,
    default:new Date().getDate()
  },

  todaycount:{
    type:Number,
    default:0,
  },

  currentWeek:{
    type:String,
    default:DateTime.now().weekNumber
  },
  
  weekcount:{
    type:Number,
    default:0,
  }
}, { timestamps: true });
  

  // tagSchema.set('toObject', { virtuals: true })
  // tagSchema.set('toJSON', { virtuals: true })


  // tagSchema.virtual('id').get(function() {
  // return this._id.toString();
// });

const tagModel = mongoose.model('tag', tagSchema);
module.exports = tagModel;