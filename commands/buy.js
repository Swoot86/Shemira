const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const Role = require('../models/Role')

const REGEX = /^\d+$/

module.exports = {
  name: 'buy',
  execute: async (msg, args) => {
    if (!msg.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) return

    const roleIndex = REGEX.test(args[0]) ? (parseInt(args[0]) - 1) : NaN

    console.log(roleIndex)

    if (!roleIndex && roleIndex !== 0) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не указал номер роли`)
      return msg.channel.send(errorEmbed)
    }

    const findRole = await Role.find()

    const role = findRole[roleIndex]

    if (!role) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, роль с номером **${roleIndex}** не найдена`)
      return msg.channel.send(errorEmbed)
    }

    const findUser = await User.findOne({ id: msg.author.id })

    if (findUser.coins < role.costs) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, у тебя недостаточно золота`)
      return msg.channel.send(errorEmbed)
    }

    if (msg.member.roles.cache.has(role.id)) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, у тебя уже есть эта роль`)
      return msg.channel.send(errorEmbed)
    }

    try {
      await msg.member.roles.add(role.id)
      await User.findOneAndUpdate({ id: msg.author.id }, { $inc: { coins: -role.costs } })
      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты успешно купил роль <@&${role.id}>`)
      msg.channel.send(successEmbed)
    } catch (error) {
      console.log(error)
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, произошла ошибка, сообщи администрации`)
      return msg.channel.send(errorEmbed)
    }
  }
}
