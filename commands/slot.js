const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { getRandom } = require('../modules/utils')

const REGEX = /^\d+$/

module.exports = {
  name: 'slot',
  execute: async (msg, args) => {
    const value = REGEX.test(args[0]) ? parseInt(args[0]) : NaN

    if (!value) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не указал сумму`)
      return msg.channel.send(errorEmbed)
    }

    const findUser = await User.findOne({ id: msg.author.id })

    if (findUser.coins < value) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, на твоем счету недостаточно золота`)
      return msg.channel.send(errorEmbed)
    }

    const getValue = getRandom(1, 100)

    let multiplier = 0

    if (getValue <= 74) {
      multiplier = 0
    } else if (getValue > 74 && getValue <= 94) {
      multiplier = 2
    } else if (getValue > 94 && getValue <= 99) {
      multiplier = 5
    } else if (getValue === 100) {
      multiplier = 10
    }

    console.log(getValue)

    if (multiplier === 0) {
      await User.updateOne({ id: msg.author.id }, { $inc: { coins: -value } })
    } else {
      await User.updateOne({ id: msg.author.id }, { $inc: { coins: value * multiplier } })
    }

    let answer = null

    if (multiplier === 0) {
      answer = `
      Тебе выпало число **${getValue}**. Ты потерял(а) свою ставку **${value}**
      Твой баланс **${findUser.coins + value * multiplier}**
      `
    } else if (multiplier === 10) {
      answer = `
      ДЖЕКПОТ!!!
      Тебе выпало число **${getValue}**. Твоя ставка **${value}** умножена в 10 раз!
      Твой баланс **${findUser.coins + value * multiplier}**
      `
    } else if (multiplier === 2) {
      answer = `
      Тебе выпало число **${getValue}**. Твоя ставка **${value}** умножена в 2 раза.
      Твой баланс **${findUser.coins + value * multiplier}**
      `
    } else if (multiplier === 5) {
      answer = `
      Тебе выпало число **${getValue}**. Твоя ставка **${value}** умножена в 5 раз.
      Твой баланс **${findUser.coins + value * multiplier}**
      `
    }

    const successEmbed = new MessageEmbed()
        .setColor(process.env.SUCCESS_COLOR)
        .setTimestamp()
        .setDescription(answer)
    msg.channel.send(successEmbed)
  }
}
