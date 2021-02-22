const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { checkDateByDay, getRandom } = require('../modules/utils')

module.exports = {
  name: 'bonus',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })


    const checkDate = checkDateByDay(findUser.lastDailyBonusDate, 1)

    console.log(checkDate)

    if (!checkDate.success) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты уже использовал бонус сегодня,
          возвращайся **${checkDate.date.toLocaleString('ru-ru', { timeZone: 'Europe/Moscow' })}**`)
      return msg.channel.send(errorEmbed)
    }

    const getRandomValue = getRandom(50, 100)

    const nowDate = new Date()

    await User.updateOne({ id: msg.author.id }, { $set: { lastDailyBonusDate: nowDate }, $inc: { coins: getRandomValue } })

    const successEmbed = new MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author}, ты получил бонус **${getRandomValue}** золота`)
    msg.channel.send(successEmbed)
  }
}
