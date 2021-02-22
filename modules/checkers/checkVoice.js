const User = require('../../models/User')

async function checkVoice(client) {
  const guild = await client.guilds.fetch(process.env.MAIN_GUILD_ID)
  guild.channels.cache.map(async channel => {
    if (channel.type !== 'voice') return
    if (channel.members.size > 0) {
      channel.members.map(async member => {
        await User.findOneAndUpdate({ id: member.user.id }, { $inc: { coins: 1, totalVoice: 1 } })
      })
    }
  })
}

module.exports = checkVoice
