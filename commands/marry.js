const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const Marry = require('../models/Marry')
const { checkUserInDatabase } = require('../modules/utils')

module.exports = {
  name: 'marry',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })

    const action = args[0] && args[0].toLowerCase()
    const user = msg.mentions.users.first()

    if (action === 'send') {
      if (findUser.marryId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты уже женат`)
        return msg.channel.send(errorEmbed)
      }

      if (!user) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не упомянул пользователя`)
        return msg.channel.send(errorEmbed)
      }

      await checkUserInDatabase(user.id)

      const findMentionUser = await User.findOne({ id: user.id })

      if (findMentionUser.marryId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, этот пользователь уже женат`)
        return msg.channel.send(errorEmbed)
      }

      const findMarry = await Marry.findOne({ from: msg.author.id, to: user.id })

      if (findMarry) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты уже отправил этому пользователю предложение о вступлении в брак`)
        return msg.channel.send(errorEmbed)
      }

      await Marry.create({
        from: msg.author.id,
        to: user.id
      })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.PRIMARY_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, согласны ли вы, любить и быть любимой, в добром здравии и в болезни, в радости и печали, не слыша шума медных труб, через огонь и воду, до конца времен, взять в законные мужья ${user}`)
      msg.channel.send(successEmbed)
    } else if (action === 'accept') {
      if (findUser.marryId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты уже женат`)
        return msg.channel.send(errorEmbed)
      }

      if (!user) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не упомянул пользователя`)
        return msg.channel.send(errorEmbed)
      }

      if (user.id === msg.author.id) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не можешь вступить в брак с самим собой`)
        return msg.channel.send(errorEmbed)
      }

      await checkUserInDatabase(user.id)

      const findMentionUser = await User.findOne({ id: user.id })

      if (findMentionUser.marryId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, этот пользователь уже женат`)
        return msg.channel.send(errorEmbed)
      }

      const findMarry = await Marry.findOne({ from: user.id, to: msg.author.id })

      if (!findMarry) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, предложение о вступлении в брак не найдено`)
        return msg.channel.send(errorEmbed)
      }

      await User.findOneAndUpdate({ id: msg.author.id }, { $set: { marryId: user.id } })
      await User.findOneAndUpdate({ id: user.id }, { $set: { marryId: msg.author.id } })
      await Marry.findOneAndDelete({ from: user.id, to: msg.author.id })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.PRIMARY_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, Сегодня вы соединили свои судьбы, и мы поздравляем вас! Держитесь крепко друг за друга. ${user}`)
          .setImage('https://media.discordapp.net/attachments/811275919137177662/813164896938229841/engagement-ring-cartoon-image-28-wedding-ring-clipart-wedding-silver-wedding-rings-cartoon-png-2400_.png')
      msg.channel.send(successEmbed)
    } else if (action === 'decline') {
      if (!user) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не упомянул пользователя`)
        return msg.channel.send(errorEmbed)
      }

      const findMarry = await Marry.findOne({ from: user.id, to: msg.author.id })

      if (!findMarry) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, предложение о вступлении в брак не найдено`)
        return msg.channel.send(errorEmbed)
      }

      await Marry.findOneAndDelete({ from: user.id, to: msg.author.id })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.PRIMARY_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты отклонил предложение о вступлении в брак с пользователем ${user}`)
      msg.channel.send(successEmbed)
    } else if (action === 'cancel') {
      if (!user) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не упомянул пользователя`)
        return msg.channel.send(errorEmbed)
      }

      const findMarry = await Marry.findOne({ from: msg.author.id, to: user.id })

      if (!findMarry) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, предложение о вступлении в брак не найдено`)
        return msg.channel.send(errorEmbed)
      }

      await Marry.findOneAndDelete({ from: msg.author.id, to: user.id })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.PRIMARY_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты отклонил предложение о вступлении в брак с пользователем ${user}`)
      msg.channel.send(successEmbed)
    }
  }
}
