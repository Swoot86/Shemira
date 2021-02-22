const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const Clan = require('../models/Clan')
const ClanUser = require('../models/ClanUser')

const CLAN_CREATE_PRICE = parseInt(process.env.CLAN_CREATE_PRICE)
const LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

module.exports = {
  name: 'clan',
  execute: async (msg, args) => {
    const action = args[0] && args[0].toLowerCase()

    args.shift()

    if (action === 'create') {
      const clanName = args.join(' ')

      const findUser = await User.findOne({ id: msg.author.id })

      if (findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты уже состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      if (findUser.coins < CLAN_CREATE_PRICE) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, у тебя недостаточно золота для создания клана`)
        return msg.channel.send(errorEmbed)
      }

      if (!clanName) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не указал название клана`)
        return msg.channel.send(errorEmbed)
      }

      if (clanName.length < 3 || clanName.length > 16) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, название клана должно быть от 3 до 16 символов`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findOne({ name: clanName })

      if (findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан с таким названием уже существует`)
        return msg.channel.send(errorEmbed)
      }

      const role = await msg.guild.roles.create({
        data: {
          name: clanName
        }
      })

      const createdClan = await Clan.create({
        name: clanName,
        owner: msg.author.id,
        roleId: role.id
      }).catch(e => {
        console.log(e)
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, произошла ошибка, обратись к администрации`)
        return msg.channel.send(errorEmbed)
      })

      await ClanUser.create({
        id: msg.author.id,
        rank: 'leader',
        clan: createdClan._id
      })

      await User.findOneAndUpdate({ id: msg.author.id }, { $set: { clanId: createdClan._id }, $inc: { coins: -CLAN_CREATE_PRICE } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, клан с названием **\`${clanName}\`** успешно создан!`)
      msg.channel.send(successEmbed)
    } else if (action === 'leave') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      if (msg.author.id === findClan.owner) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты создатель клана и не можешь из него выйти`)
        return msg.channel.send(errorEmbed)
      }

      await msg.member.roles.remove(findClan.roleId)

      await ClanUser.findOneAndDelete({ id: msg.author.id })
      await User.findOneAndUpdate({ id: msg.author.id }, { $set: { clanId: null } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты вышел из клана **\`${findClan.name}\`**`)
      msg.channel.send(successEmbed)
    } else if (action === 'delete') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      if (msg.author.id !== findClan.owner) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не создатель клана`)
        return msg.channel.send(errorEmbed)
      }

      await User.updateMany({ clanId: findClan._id }, { $set: { clanId: null } })
      await Clan.findByIdAndDelete(findClan._id)
      await ClanUser.deleteMany({ clan: findClan._id })

      await msg.guild.roles.cache.find(role => role.id === findClan.roleId).delete()

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, клан с названием **\`${findClan.name}\`** успешно удален`)
      msg.channel.send(successEmbed)
    } else if (action === 'invite') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      const findClanUser = await ClanUser.findOne({ id: msg.author.id })

      if (findClanUser.rank === 'user') {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, у тебя недостаточно прав`)
        return msg.channel.send(errorEmbed)
      }

      const user = msg.mentions.users.first()

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
            .setDescription(`${msg.author}, ты не можешь пригласить самого себя`)
        return msg.channel.send(errorEmbed)
      }

      const findNewUser = await User.findOne({ id: user.id })

      if (!findNewUser) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, этот пользователь ни разу не пользовался ботом`)
        return msg.channel.send(errorEmbed)
      }

      if (findNewUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, этот пользователь уже состоит в клане`)
        return msg.channel.send(errorEmbed)
      }

      await Clan.findByIdAndUpdate(findClan._id, { $push: { invites: user.id } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты успешно пригласил ${user} в клан **\`${findClan.name}\`**`)
      msg.channel.send(successEmbed)
    } else if (action === 'accept') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты уже состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const name = args[0]

      const findClan = await Clan.findOne({ name, invites: msg.author.id })

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не приглашен в этот клан`)
        return msg.channel.send(errorEmbed)
      }

      await User.findByIdAndUpdate(findUser._id, { $set: { clanId: findClan._id } })

      await Clan.findByIdAndUpdate(findClan._id, { $pull: { invites: msg.author.id } })

      await ClanUser.create({
        id: msg.author.id,
        clan: findClan._id
      })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты вступил в клан **\`${findClan.name}\`**`)
      return msg.channel.send(successEmbed)
    } else if (action === 'decline') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты уже состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const name = args[0]

      const findClan = await Clan.findOne({ name, invites: msg.author.id })

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не приглашен в этот клан`)
        return msg.channel.send(errorEmbed)
      }

      await Clan.findByIdAndUpdate(findClan._id, { $pull: { invites: msg.author.id } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты отклонил приглашение в клан **\`${findClan.name}\`**`)
      return msg.channel.send(successEmbed)
    } else if (action === 'info') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      const findClanUsers = await ClanUser.find({ clan: findClan._id })

      const clanOwner = msg.guild.member(findClanUsers.find(r => r.rank === 'leader').id)
      const clanEditors = findClanUsers.filter(r => r.rank === 'editor').map((r, i) => {
        const member = msg.guild.member(r.id)
        
        return `\`[${i + 1}]\` ${member.user.username} (${member.user})`
      })

      const infoEmbed = new MessageEmbed()
          .setAuthor(msg.author.username, msg.author.displayAvatarURL())
          .setColor(process.env.PRIMARY_COLOR)
          .setTimestamp()
          .addFields([
            {
              name: `${findClan.ranks[2].name}:`,
              value: `**${clanOwner.user.username}** (${clanOwner.user})`,
              inline: true
            },
            {
              name: `${findClan.ranks[1].name}:`,
              value: clanEditors.length ? clanEditors.join('\n') : 'Пусто',
              inline: true
            },
            {
              name: '_Описание:_',
              value: findClan.description || 'Пусто'
            }
          ])
          .setImage(findClan.thumbnail)
          .setFooter(`${findClanUsers.length} участник(а, ов)`)
      msg.channel.send(infoEmbed)
    } else if (action === 'description') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      if (msg.author.id !== findClan.owner) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не создатель клана`)
        return msg.channel.send(errorEmbed)
      }

      const description = args.join(' ')

      if (!description) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, описание клана не найдено`)
        return msg.channel.send(errorEmbed)
      }

      if (description.length > 600) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, описание клана не должно превышать 600 символов`)
        return msg.channel.send(errorEmbed)
      }

      await Clan.findByIdAndUpdate(findClan._id, { $set: { description } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, описание клана успешно изменено`)
      msg.channel.send(successEmbed)
    } else if (action === 'promote') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      if (msg.author.id !== findClan.owner) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не создатель клана`)
        return msg.channel.send(errorEmbed)
      }

      const user = msg.mentions.users.first()

      if (!user) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не упомянул пользователя`)
        return msg.channel.send(errorEmbed)
      }

      const findNewUser = await User.findOne({ id: user.id })

      if (!findNewUser) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, этот пользователь ни разу не пользовался ботом`)
        return msg.channel.send(errorEmbed)
      }

      if (JSON.stringify(findNewUser.clanId) !== JSON.stringify(findUser.clanId)) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, этот пользователь состоит в другом клане`)
        return msg.channel.send(errorEmbed)
      }

      args.shift()

      const rankName = args[0]

      if (!rankName) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не написал новое название ранга`)
        return msg.channel.send(errorEmbed)
      }

      const findRank = findClan.ranks.find(rank => rank.name === rankName)

      if (!findRank) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ранг с таким названием не найден`)
        return msg.channel.send(errorEmbed)
      }

      if (findRank.role === 'leader') {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ${findRank.name} может быть только один`)
        return msg.channel.send(errorEmbed)
      }

      await ClanUser.findOneAndUpdate({ id: user.id }, { $set: { rank: findRank.role } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, ты успешно изменил ранг ${user} на **${findRank.name}**`)
      msg.channel.send(successEmbed)
    } else if (action === 'edit') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      if (msg.author.id !== findClan.owner) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не создатель клана`)
        return msg.channel.send(errorEmbed)
      }

      const oldRankName = args[0]
      const newRankName = args[1]

      if (!oldRankName) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не написал старое название ранга`)
        return msg.channel.send(errorEmbed)
      }

      if (!newRankName) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не написал новое название ранга`)
        return msg.channel.send(errorEmbed)
      }

      const findRank = findClan.ranks.find(rank => rank.name === oldRankName)

      if (!findRank) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ранг с названием \`${oldRankName}\` не найден`)
        return msg.channel.send(errorEmbed)
      }

      let query = 'ranks.0.name'

      if (findRank.role === 'editor') {
        query = 'ranks.1.name'
      } else if (findRank.role === 'leader') {
        query = 'ranks.2.name'
      }

      await Clan.findByIdAndUpdate(findClan._id, { $set: { [query]: newRankName } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, название ранга успешно изменено`)
      msg.channel.send(successEmbed)
    } else if (action === 'thumbnail') {
      const findUser = await User.findOne({ id: msg.author.id })

      if (!findUser.clanId) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не состоишь в клане`)
        return msg.channel.send(errorEmbed)
      }

      const findClan = await Clan.findById(findUser.clanId)

      if (!findClan) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, клан не найден, повтори попытку`)
        return msg.channel.send(errorEmbed)
      }

      if (msg.author.id !== findClan.owner) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не создатель клана`)
        return msg.channel.send(errorEmbed)
      }

      const link = LINK_REGEX.test(args[0]) && args[0]

      if (!link) {
        const errorEmbed = new MessageEmbed()
            .setColor(process.env.ERROR_COLOR)
            .setTimestamp()
            .setDescription(`${msg.author}, ты не указал ссылку`)
        return msg.channel.send(errorEmbed)
      }

      await Clan.findByIdAndUpdate(findClan._id, { $set: { thumbnail: link } })

      const successEmbed = new MessageEmbed()
          .setColor(process.env.SUCCESS_COLOR)
          .setTimestamp()
          .setDescription(`${msg.author}, изображение клана успешно изменено`)
      msg.channel.send(successEmbed)
    }
  }
}
