const User = require('../models/User')

async function checkUserInDatabase(id) {
  const findUser = await User.findOne({ id })

  if (findUser) return false

  await User.create({
    id
  })

  return true
}

function getHours(minutes) {
  let h = Math.floor(minutes / 60)
  let m = minutes % 60

  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m

  return `${h} ч. ${m} м.`
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function checkDateByDay(date, day) {
  const now = new Date()

  date = new Date(date)
  
  date.setDate(date.getDate() + day)

  if (now < date) return { success: false, date: date }

  return { success: true, date: date }
}

async function incMessage(id) {
  await checkUserInDatabase(id)

  await User.updateOne({ id }, { $inc: { totalMessages: 1 } })
}

module.exports = {
  checkUserInDatabase,
  getHours,
  getRandom,
  checkDateByDay,
  incMessage
}
