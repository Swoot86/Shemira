const { MessageEmbed } = require('discord.js')
const Role = require('../models/Role')

module.exports = {
  name: 'deleterole',
  execute: async (msg, args) => {
    if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return

    const roleId = args[0]

    if (!roleId) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не указал Id роли`)
      return msg.channel.send(errorEmbed)
    }

    const findRoleInGuild = msg.guild.roles.cache.has(roleId)

    if (!findRoleInGuild) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, роль с id ${roleId} не найдена`)
      return msg.channel.send(errorEmbed)
    }

    const findRole = await Role.findOne({ id: roleId })

    if (!findRole) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, роль с id ${roleId} не найдена в базе данных`)
      return msg.channel.send(errorEmbed)
    }

    await Role.findOneAndDelete({ id: roleId })

    const successEmbed = new MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author}, роль с id ${roleId} удалены из базы данных`)
    msg.channel.send(successEmbed)
  }
}
