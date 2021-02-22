const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { checkUserInDatabase } = require('../modules/utils')

module.exports = {
  name: 'rep',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })

    const nowDate = new Date()
    const lastDate = new Date(findUser.lastSendedRep)

    lastDate.setDate(lastDate.getDate() + 7)

    if (nowDate < lastDate) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты еще не можешь выдать репутацию, возвращайся ${lastDate.toLocaleString('ru-ru', { timeZone: 'Europe/Moscow' })}`)
      return msg.channel.send(errorEmbed)
    }

    const user = msg.mentions.users.first()

    if (!user) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не указал пользователя`)
      return msg.channel.send(errorEmbed)
    }

    if (msg.author.id === user.id) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не можешь изменить репутацию себе`)
      return msg.channel.send(errorEmbed)
    }

    const types = ['+', '-']

    const type = args[1]

    if (!types.includes(type)) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, чтобы выдать репутацию напиши \`+\`, чтобы снять \`-\``)
      return msg.channel.send(errorEmbed)
    }

    await checkUserInDatabase(user.id)

    if (type === '+') {
      await User.updateOne({ id: user.id }, { $inc: { reputation: 1 } })
    } else {
      await User.updateOne({ id: user.id }, { $inc: { reputation: -1 } })
    }

    await User.updateOne({ id: msg.author.id }, { $set: { lastSendedRep: nowDate } })

    const successEmbed = new MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author}, ты изменил репутацию пользователю ${user}`)
    msg.channel.send(successEmbed)
  }
}
