require('dotenv/config')

const { Client, Collection } = require('discord.js')
const { connect } = require('mongoose')
const NekosLife = require('nekos.life')
const User = require('./models/User')
const { readdirSync } = require('fs')

const Quiz = require('./modules/Quiz')
const Math = require('./modules/Math')
const { checkUserInDatabase, incMessage } = require('./modules/utils')
const checker = require('./modules/checkers')

const REGEX = /^\d+$/

const client = new Client()
client.commands = new Collection()
client.quiz = new Quiz(client)
client.math = new Math(client)
client.neko = new NekosLife()

const invites = new Collection()

connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => console.log('Connected to database!'))

const commandFiles = readdirSync('./commands').filter(r => r.endsWith('.js'))
for (const commandFile of commandFiles) {
  const command = require(`./commands/${commandFile}`)

  client.commands.set(command.name, command)
}

client.on('message', async msg => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(process.env.PREFIX)) {
    incMessage(msg.author.id)
    if (client.quiz.active) {
      if (msg.channel.id === client.quiz.quizChannel.id) {
        client.quiz.onMessage(msg)
      }
    }
    if (client.math.active) {
      if (msg.channel.id === client.math.mathChannel.id) {
        if (REGEX.test(msg.content)) {
          client.math.onMessage(msg)
        }
      }
    }
    return
  }

  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName)

  if (!command) return

  await checkUserInDatabase(msg.author.id)

  try {
    command.execute(msg, args)
  } catch (error) {
    console.log(error)
  }
})

client.on('guildMemberAdd', async member => {

  const cachedInvites = invites.get(member.guild.id)
  const newInvites = await member.guild.fetchInvites()

  invites.set(member.guild.id, newInvites)

  const invite = newInvites.find(i => cachedInvites.get(i.code).uses < i.uses)

  if (invite && !invite.inviter) return

  if (!invite.inviter) return

  if (invite.inviter.id === member.user.id) return

  await checkUserInDatabase(invite.inviter.id)

  await User.findOneAndUpdate({ id: invite.inviter.id }, { $inc: { totalInvites: 1 } })
})

client.on('inviteCreate', async invite => invites.set(invite.guild.id, await invite.guild.fetchInvites()))

client.on('ready', () => {
  console.log(`${client.user.tag} is ready!`)
  client.quiz.init()
  // client.math.init()

  checker(client)

  client.guilds.cache.forEach(async guild => {
    guild.fetchInvites()
        .then(invite => invites.set(guild.id, invite))
        .catch(err => {})
  })
})

client.login(process.env.TOKEN)
