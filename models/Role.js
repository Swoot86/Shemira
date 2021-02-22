const { Schema, model } = require('mongoose')

const RoleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  costs: {
    type: Number,
    required: true
  }
})

module.exports = model('RoleModel', RoleSchema, 'roles')
