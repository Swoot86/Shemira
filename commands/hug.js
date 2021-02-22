const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'hug',
  execute: async (msg, args) => {
    const user = msg.mentions.users.first()

    if (!user) {
      const errorEmbed = new MessageEmbed()
          .setColor(process.env.ERROR_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты не упомянул пользователя`)
      return msg.channel.send(errorEmbed)
    }

    const { url } = await msg.client.neko.sfw.hug()

    const embed = new MessageEmbed()
        .setColor(process.env.SECONDARY_COLOR)
        .setTimestamp()
        .setDescription(`${msg.author} обнял ${user}`)
        .setImage(url)
    msg.channel.send(embed)
  }
}
