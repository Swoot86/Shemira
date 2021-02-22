const { Schema, model } = require('mongoose')

const MarrySchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  }
})

module.exports = model('MarryModel', MarrySchema, 'marries')
