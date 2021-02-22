const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'qstart',
  execute: async (msg, args) => {
    msg.client.quiz.startQuiz()
  }
}
