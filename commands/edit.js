const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { checkUserInDatabase } = require('../modules/utils')

module.exports = {
  name: 'edit',
  execute: async (msg, args) => {
    if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return

    const user = msg.mentions.users.first()

    const type = args[1] && args[1].toLowerCase()

    const number = parseInt(args[2])

    if (!user) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не упомянул пользователя`)
      return msg.channel.send(errorEmbed)
    }

    if (!type) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты написал тип`)
      return msg.channel.send(errorEmbed)
    }

    if (!number) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не написал число`)
      return msg.channel.send(errorEmbed)
    }

    await checkUserInDatabase(user.id)

    if (type === 'монеты') {
      await User.updateOne({ id: user.id }, { $inc: { coins: number } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты успешно изменил монеты пользователю ${user}`)
      return msg.channel.send(successEmbed)
    } else if (type === 'репутация') {
      await User.updateOne({ id: user.id }, { $inc: { reputation: number } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты успешно изменил репутацию пользователю ${user}`)
      return msg.channel.send(successEmbed)
    } else {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, такой тип не найден`)
      return msg.channel.send(errorEmbed)
    }
  }
}
