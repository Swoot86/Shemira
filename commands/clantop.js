const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const Clan = require('../models/Clan')
const { getHours } = require('../modules/utils')

module.exports = {
  name: 'clantop',
  execute: async (msg, args) => {
    let clans = []

    clans = (await Clan.find())
        .map(r => (
          { id: r._id, name: r.name, voice: 0 }
        ))

    const findUsers = await User.find({ clanId: { $exists: true, $ne: null } })

    if (findUsers.length === 0) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, кланы не найдены`)
      return msg.channel.send(errorEmbed)
    }

    if (clans.length === 0) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, кланы не найдены`)
      return msg.channel.send(errorEmbed)
    }

    findUsers.map(r => {
      // eslint-disable-next-line max-len
      const findIndex = clans.findIndex(i => i.id.toString() === r.clanId.toString())
      if (findIndex < 0) return
      clans[findIndex].voice += r.totalVoice
    })

    clans.sort((a, b) => b.voice - a.voice)

    clans = clans.slice(0, 10)

    clans = clans.map((r, i) => `**${i + 1}.** \`${r.name}\` - ${getHours(r.voice)}`)

    const successEmbed = new MessageEmbed()
        .setColor(process.env.PRIMARY_COLOR)
        .setTimestamp()
        .addFields([
          {
            name: 'Топ 10 кланов по голосовой активности',
            value: clans.join('\n')
          }
        ])
    msg.channel.send(successEmbed)
  }
}
