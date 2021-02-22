const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const Clan = require('../models/Clan')
const { getHours } = require('../modules/utils')

module.exports = {
  name: 'profile',
  execute: async (msg, args) => {
    const findUser = await User.findOne({ id: msg.author.id })

    const findClan = await Clan.findOne({ _id: findUser.clanId })

    const findByVoice = await User.find().sort('-totalVoice')
    const findByMoney = await User.find().sort('-coins')
    const findByInvites = await User.find().sort('-totalInvites')
    const findByMessages = await User.find().sort('-totalMessages')

    const embed = new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setColor(process.env.PRIMARY_COLOR)
        .setTitle('Карточка пользователя')
        .setTimestamp()
        .setThumbnail(msg.author.displayAvatarURL())
        .addFields([
          {
            name: 'Клан',
            value: findClan ? findClan.name : 'Не состоит'
          },
          {
            name: 'Семейное положение',
            value: findUser.marryId ? `В браке с <@${findUser.marryId}>` : 'Не в браке'
          },
          {
            name: 'Голосовой',
            value: `\`\`\`${getHours(findUser.totalVoice)}\`\`\``,
            inline: true
          },
          {
            name: 'Сообщений',
            value: `\`\`\`${findUser.totalMessages}\`\`\``,
            inline: true
          },
          {
            name: 'Приглашений',
            value: `\`\`\`${findUser.totalInvites}\`\`\``,
            inline: true
          },
          {
            name: 'Место в топе',
            value: `
            voice: ${findByVoice.findIndex(user => user.id === msg.author.id) + 1}
            messages: ${findByMessages.findIndex(user => user.id === msg.author.id) + 1}
            coins: ${findByMoney.findIndex(user => user.id === msg.author.id) + 1}
            invites: ${findByInvites.findIndex(user => user.id === msg.author.id) + 1}
            `
          },
          {
            name: 'Золото',
            value: `\`\`\`${findUser.coins}\`\`\``
          },
          {
            name: 'Подключился',
            value: `\`\`\`asciidoc\n[${msg.member.joinedAt.toLocaleDateString('ru-ru', { timeZone: 'Europe/Moscow' })}]\`\`\``,
            inline: true
          },
          {
            name: 'Создал аккаунт',
            value: `\`\`\`asciidoc\n[${msg.member.user.createdAt.toLocaleDateString('ru-ru', { timeZone: 'Europe/Moscow' })}]\`\`\``,
            inline: true
          },
          {
            name: 'Репутация',
            value: `\`\`\`${findUser.reputation > 0 ? '+' + findUser.reputation : findUser.reputation}\`\`\``,
            inline: true
          }
        ])
    msg.channel.send(embed)

  }
}
