const { MessageEmbed } = require('discord.js')
const User = require('../models/User')
const { getRandom } = require('./utils')

class Math {
  constructor(client) {
    this.client = client
    this.mathChannel = null
    this.active = false
    this.award = parseInt(process.env.MATH_AWARD)
    this.lastDate = null
    this.startDate = null

    this.numbers = []
    this.answer = 0
  }

  init() {
    this.mathChannel = this.client.channels.cache.get(process.env.MATH_CHANNEL_ID)

    this.startInterval()
  }

  startInterval() {
    setInterval(() => {
      if (!this.active) {
        if (this.canStart) this.startGame()
        return
      }
      const nowDate = new Date()
      const startDate = new Date(this.startDate)

      startDate.setMinutes(startDate.getMinutes() + 5)

      if (nowDate < startDate) return

      this.sendNoWinnerEmbed(this.answer)

      this.clear()
      
    }, 5000)
  }

  onMessage(msg) {
    const number = parseInt(msg.content)

    console.log(this.answer)
    console.log(number)

    if (this.answer !== number) return

    this.clear()
    this.sendWinnerEmbed(msg.author, number)
    this.sendAward(msg.author.id, number)
  }

  async sendAward(id) {
    await User.findOneAndUpdate({ id }, { $inc: { coins: this.award } })
  }

  clear() {
    this.active = false
    this.lastDate = new Date()
  }

  startGame() {
    if (!this.canStart) return

    this.active = true
    this.numbers = this.generateNumbers()
    this.answer = this.numbers.reduce((a, b) => a + b, 0)

    this.sendStartEmbed()
    this.startDate = new Date()
  }

  get canStart() {
    const lastDate = new Date(this.lastDate)
    const nowDate = new Date()

    lastDate.setMinutes(lastDate.getMinutes() + 50)

    if (nowDate < lastDate) return false

    return true
  }

  sendStartEmbed() {
    const getValue = this.numbers
    const embed = new MessageEmbed()
        .setColor(process.env.SECONDARY_COLOR)
        .setTimestamp()
        .setTitle('[Мини игра] Математика на скорость')
        .setDescription(`Кто первый ответит получит **${this.award}** золота`)
        .addFields([
          {
            name: 'Пример:',
            value: `**${getValue[0]}** + **${getValue[1]}** = ?`
          }
        ])
    this.mathChannel.send(embed)
  }
  
  sendWinnerEmbed(author, number) {
    const embed = new MessageEmbed()
        .setColor(process.env.SECONDARY_COLOR)
        .setTimestamp()
        .setDescription(`${author} стал победителем! Число которое нужно было угадать: **${number}**`)
    this.mathChannel.send(embed)
  }

  sendNoWinnerEmbed(number) {
    const embed = new MessageEmbed()
        .setColor(process.env.SECONDARY_COLOR)
        .setTimestamp()
        .setDescription(`Никто не смог ответить правильно. Число которое нужно было угадать: **${number}**`)
    this.mathChannel.send(embed)
  }

  generateNumbers() {
    const result = [getRandom(0, 1000), getRandom(0, 1000)]

    return result
  }
}

module.exports = Math
