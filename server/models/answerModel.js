const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  answer: {
    type: String,
    required: true
  },
  voted: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  top: {
    type: Boolean,
    default: false,
    required: true
  },
  createOn: { 
    type: Date, 
    default: Date.now 
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;