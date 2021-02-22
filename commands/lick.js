const { MessageEmbed } = require('discord.js')

const gifs = [
  'https://cdn.discordapp.com/attachments/811275919137177662/813110015689752616/S1Ill0_vW.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110763974557716/H1zlgRuvZ.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110825807380520/ryGpGsnAZ.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110845537386566/Syg8gx0OP-.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110855138934794/rJ6hrQr6-.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110854974832660/HkEqiExdf.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110874038206464/rkBbBQS6W.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110882133082122/Sk15iVlOf.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110884502994984/rykRHmB6W.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813110911069454397/H13HS7S6-.gif'
]

module.exports = {
  name: 'lick',
  execute: async (msg, args) => {
    const user = msg.mentions.users.first()

    if (!user) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не упомянул пользователя`)
      return msg.channel.send(errorEmbed)
    }

    const randomImage = Math.floor(Math.random() * gifs.length)

    const url = gifs[randomImage]

    const embed = new MessageEmbed()
        .setColor(process.env.SECONDARY_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author} облизал ${user}`)
        .setImage(url)
    msg.channel.send(embed)
  }
}
