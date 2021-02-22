const { MessageEmbed } = require('discord.js')
const User = require('../models/User')

module.exports = {
  name: 'divorce',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })

    if (!findUser.marryId) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не женат`)
      return msg.channel.send(errorEmbed)
    }

    await User.findOneAndUpdate({ id: msg.author.id }, { $set: { marryId: null } })
    await User.findOneAndUpdate({ id: findUser.marryId }, { $set: { marryId: null } })

    const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_EMBED)
          .setTimestamp()
          .setImage('https://media.discordapp.net/attachments/811275919137177662/813164961601290280/10-102675_heart-clip-art-broken-heart-png.png?width=754&height=616')
          .setDescription(`${msg.author}, Зачем нам лишние проблемы? Нам обоим нужно что-то менять в жизни. Счастливого пути, солнце! Я прощаю тебя и отпускаю. <@${findUser.marryId}>`)
      return msg.channel.send(successEmbed)
  }
}
