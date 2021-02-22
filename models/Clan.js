const { Schema, model } = require('mongoose')

const ClanSchema = new Schema({
  owner: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  roleId: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: null
  },
  ranks: {
    type: Array,
    default: [
      { name: 'Участник', role: 'user' },
      { name: 'Заместитель', role: 'editor' },
      { name: 'Создатель', role: 'leader' }
    ]
  },
  invites: {
    type: Array,
    default: []
  },
  bans: {
    type: Array,
    default: []
  }
})

module.exports = model('ClanModel', ClanSchema, 'clans')
