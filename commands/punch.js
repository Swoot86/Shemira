const { MessageEmbed } = require('discord.js')

const gifs = [
  'https://media.discordapp.net/attachments/811275919137177662/813117392028303411/1.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117402841743360/3.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117480582905856/4.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117539004448788/6.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117592632819794/11.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117644470616084/13.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117684283342889/15.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117734421659668/B1rZP6b-z.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117779573342268/EHzF.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117851186757642/HykeDaZWf.gif',
  'https://media.discordapp.net/attachments/811275919137177662/813117902105346098/orig5.gif'
]

module.exports = {
  name: 'punch',
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
        .setDescription(`${msg.author} ударил ${user}`)
        .setImage(url)
    msg.channel.send(embed)
  }
}
