const { MessageEmbed } = require('discord.js')
const Role = require('../models/Role')

module.exports = {
  name: 'shop',
  execute: async (msg, args) => {
    const findRoles = await Role.find()

    if (findRoles.length === 0) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, роли в магазине не найдены`)
      return msg.channel.send(errorEmbed)
    }

    const format = findRoles.map((r, i) => `**${i + 1}**. <@&${r.id}> - **${r.costs}** золота`)

    const successEmbed = new MessageEmbed()
          .setColor(process.env.PRIMARY_COLOR)
          .setTimestamp()
          .setDescription(format.join('\n'))
      return msg.channel.send(successEmbed)
  }
}
