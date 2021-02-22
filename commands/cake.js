const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { getRandom } = require('../modules/utils')

const CAKE_EMOJI = '🍰'
const REGEX = /^\d+$/

module.exports = {
  name: 'cake',
  execute: async (msg, args) => {
    const value = REGEX.test(args[0]) ? parseInt(args[0]) : NaN

    const findUser = await User.findOne({ id: msg.author.id })

    if (!value) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не указал сумму`)
      return msg.channel.send(errorEmbed)
    }

    if (findUser.coins < value) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, на твоем счету недостаточно золота`)
      return msg.channel.send(errorEmbed)
    }

    const emojis = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣']

    const generateCakeNumber = getRandom(1, 5)

    const embed = new MessageEmbed()
        .setColor(process.env.SECONDARY_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author}, напиши под каким номером находится кекс, в случае победы ты получишь **${value * 3}** монет`)
        .setFooter('Время - 1 минута!')
    msg.channel.send(emojis.join(''), { embed })

    const channelCollector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, { time: 1 * 60 * 1000 })

    channelCollector.on('collect', async m => {
      const userValue = parseInt(m.content)

      if (userValue === generateCakeNumber) {
        emojis[generateCakeNumber - 1] = CAKE_EMOJI

        const embed = new MessageEmbed()
            .setColor(process.env.SUCCESS_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты нашел кекс! Ты выиграл **${value * 3}** монет`)
        msg.channel.send(emojis.join(''), { embed })

        await User.updateOne({ id: msg.author.id }, { $inc: { coins: value * 3 } })
      } else {
        emojis[generateCakeNumber - 1] = CAKE_EMOJI

        const embed = new MessageEmbed()
            .setColor(process.env.SUCCESS_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, кекс был под номером ${generateCakeNumber}! Ты проиграл **${value}** монет`)
        msg.channel.send(emojis.join(''), { embed })

        await User.updateOne({ id: msg.author.id }, { $inc: { coins: -value } })
      }

      channelCollector.stop()
    })
  }
}
