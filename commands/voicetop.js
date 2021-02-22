const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { getHours } = require('../modules/utils')

module.exports = {
  name: 'voicetop',
  execute: async (msg, args) => {
    const findUsers = await User.find().sort('-totalVoice').limit(10)

    const format = findUsers.map((user, i) => `**${i + 1}.** <@${user.id}> - **${getHours(user.totalVoice)}**`)

    const embed = new MessageEmbed()
        .setTitle('Топ по голосовой активности')
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTimestamp()
        .setColor(process.env.PRIMARY_COLOR)
        .setDescription(format.join('\n'))
    msg.channel.send(embed)
  }
}
