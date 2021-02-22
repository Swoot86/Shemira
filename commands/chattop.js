const { MessageEmbed } = require('discord.js')
const User = require('../models/User')

module.exports = {
  name: 'chattop',
  execute: async (msg, args) => {
    const findUsers = await User.find().sort('-totalMessages').limit(10)

    const format = findUsers.map((user, i) => `**${i + 1}.** <@${user.id}> - **${user.totalMessages}** сообщений`)

    const embed = new MessageEmbed()
        .setTitle('Топ по сообщениям')
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp()
        .setColor(process.env.PRIMARY_COLOR)
        .setDescription(format.join('\n'))
    msg.channel.send(embed)
  }
}
