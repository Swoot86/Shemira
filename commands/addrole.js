const { MessageEmbed } = require('discord.js')
const Role = require('../models/Role')

const REGEX = /^\d+$/

module.exports = {
  name: 'addrole',
  execute: async (msg, args) => {
    if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return

    const roleId = args[0]
    const costs = REGEX.test(args[1]) ? parseInt(args[1]) : NaN

    if (!roleId) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не указал Id роли`)
      return msg.channel.send(errorEmbed)
    }

    if (!costs) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты неверно указал стоимость покупки роли`)
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

    if (findRole) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, роль с id ${roleId} уже есть в базе данных`)
      return msg.channel.send(errorEmbed)
    }

    await Role.create({ id: roleId, costs })

    const successEmbed = new MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author}, роль с id ${roleId} добавлена в базу данных`)
    msg.channel.send(successEmbed)
  }
}
