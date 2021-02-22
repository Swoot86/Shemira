const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'avatar',
  execute: (msg, args) => {
    const user = msg.mentions.users.first() || msg.author

    const embed = new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setColor(process.env.PRIMARY_EMBED)
        .setTitle(`Аватар ${user.tag}`)
        .setImage(user.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
    msg.channel.send(embed)
  }
}
