const { Schema, model, Types } = require('mongoose')

const clanUserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  rank: {
    type: String,
    default: 'user'
  },
  enteredCoins: {
    type: Number,
    default: 0
  },
  clan: {
    type: Types.ObjectId,
    ref: 'ClanModel',
    required: true
  }
})

module.exports = model('clanUserModel', clanUserSchema, 'clanusers')
