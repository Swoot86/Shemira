const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
})

module.exports = model('QuestionModel', QuestionSchema, 'questions')
