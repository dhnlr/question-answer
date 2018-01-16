const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  voted: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  voteCount: Number,
  author: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  createOn: { 
    type: Date, 
    default: Date.now 
  }
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;