const { MessageEmbed } = require('discord.js')
const User = require('../models/User')

module.exports = {
  name: 'balance',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })

    const embed = new MessageEmbed()
        .setColor(process.env.PRIMARY_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author}, твой баланс **${findUser.coins}** золота`)
    msg.channel.send(embed)
  }
}
