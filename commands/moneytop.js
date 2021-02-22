const { MessageEmbed } = require('discord.js')
const User = require('../models/User')

module.exports = {
  name: 'moneytop',
  execute: async (msg, args) => {
    const findUsers = await User.find().sort('-coins').limit(10)

    const format = findUsers.map((user, i) => `**${i + 1}.** <@${user.id}> - **${user.coins}** монет`)

    const embed = new MessageEmbed()
        .setTitle('Топ по монетам')
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp()
        .setColor(process.env.PRIMARY_COLOR)
        .setDescription(format.join('\n'))
    msg.channel.send(embed)
  }
}
