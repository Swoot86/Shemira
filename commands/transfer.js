const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { checkUserInDatabase } = require('../modules/utils')

module.exports = {
  name: 'transfer',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })

    const user = msg.mentions.users.first()
    const value = parseInt(args[1].replace(/-/g, ''))

    if (!user) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не упомянул пользователя`)
      return msg.channel.send(errorEmbed)
    }

    await checkUserInDatabase(user.id)

    if (!value) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты написал кол-во золота`)
      return msg.channel.send(errorEmbed)
    }
    
    if (user.id === msg.author.id) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты указал самого себя`)
      return msg.channel.send(errorEmbed)
    }

    if (findUser.coins < value) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, на твоем счету недостаточно золота`)
      return msg.channel.send(errorEmbed)
    }

    await User.updateOne({ id: msg.author.id }, { $inc: { coins: -value } })
    await User.updateOne({ id: user.id }, { $inc: { coins: value } })

    const successEmbed = new MessageEmbed()
        .setColor(process.env.SUCCESS_EMBED)
        .setTimestamp()
        .setDescription(`${msg.author}, ты перевел **${value}** золота пользователю ${user}`)
    msg.channel.send(successEmbed)
  }
}
