const { Schema, model, Types } = require('mongoose')

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  marryId: {
    type: String,
    default: null
  },
  coins: {
    type: Number,
    default: 0
  },
  reputation: {
    type: Number,
    default: 0
  },
  totalMessages: {
    type: Number,
    default: 0
  },
  totalVoice: {
    type: Number,
    default: 0
  },
  totalInvites: {
    type: Number,
    default: 0
  },
  totalAnsweredQuestions: {
    type: Number,
    default: 0
  },
  clanId: {
    type: Types.ObjectId,
    ref: 'ClanModel',
    default: null
  },
  familyId: {
    type: Types.ObjectId,
    default: null
  },
  lastSendedRep: {
    type: Date,
    default: null
  },
  lastDailyBonusDate: {
    type: Date,
    default: null
  }
})

module.exports = model('UserModel', UserSchema, 'users')
