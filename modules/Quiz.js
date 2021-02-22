const { MessageEmbed } = require('discord.js')
const Questions = require('../models/Question')
const Users = require('../models/User')
const { checkUserInDatabase } = require('./utils')

class Quiz {
  constructor(client) {
    this.client = client
    this.quizChannel = null

    this.players = []
    this.questions = []

    this.currentQuestionIndex = 0
    this.active = false

    this.answer = []

    this.interval = null
  }

  init() {
    this.quizChannel = this.client.channels.cache.get(process.env.QUIZ_CHANNEL_ID)
  }

  async startQuiz() {
    this.questions = []
    this.players = []
    this.answer = []
    this.currentQuestionIndex = 0
    const findQuestions = await Questions.find({ active: true }).limit(5).lean()

    if (findQuestions.length === 0) return

    this.questions = findQuestions

    this.active = true
    this.loadQuestion()
    return true
  }

  loadQuestion() {
    this.answer = []
    const question = this.currentQuestion

    this.sendQuestion(question.question, this.currentQuestionIndex)

    console.log(question)

    this.maskQuestion()
    console.log('load question')
    this.interval = setInterval(() => {
      console.log('use')
      if (!this.active) return clearInterval(this.interval)
      if (this.randomShow()) {
        clearInterval(this.interval)
        setTimeout(() => {
          this.loadNextQuestion()
        }, 1000)
      }
    }, 5000)
  }

  loadNextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length - 1) return this.closeGame()

    this.currentQuestionIndex++

    this.loadQuestion()
  }

  async disableQuestion() {
    this.questions.map(async question => {
      await Questions.findByIdAndUpdate(question._id, { $set: { active: false } })
    })
  }

  closeGame() {
    this.active = false
    this.disableQuestion()
    this.sendCloseGame()
  }

  sendCloseGame() {
    this.quizChannel.send('Вопросы закончились! Викторина завершена!')
    this.sendTop()
  }

  sendTop() {
    console.log(this.players)
    const format = this.players
        .sort((a, b) => b.correct - a.correct)
        .map((r, i) => {
          const index = i + 1
          
          this.setReward(r.id, index)
          this.setAnsweredQuestions(r.id, r.correct)

          return `**${index}.** ${this.getTopEmoji(index)} <@${r.id}> - ${r.correct} правильных ответа. ${this.getReward(index)}`
        })

    const topEmbed = new MessageEmbed()
        .setTitle('Топ викторины')
        .setDescription(format.join('\n'))
    this.quizChannel.send(topEmbed)
  }

  sendQuestion(question, index) {
    this.quizChannel.send(`Вопрос номер **${index + 1}. ${question}**`)
  }

  async setReward(id, index) {
    await checkUserInDatabase(id)

    if (index === 1) {
      await Users.findOneAndUpdate({ id }, { $inc: { coins: 10 } })
    } else if (index === 2) {
      await Users.findOneAndUpdate({ id }, { $inc: { coins: 5 } })
    } else if (index === 3) {
      await Users.findOneAndUpdate({ id }, { $inc: { coins: 2 } })
    }
  }

  async setAnsweredQuestions(id, questions) {
    await checkUserInDatabase(id)

    await Users.findOneAndUpdate({ id }, { $inc: { totalAnsweredQuestions: questions } })
  }

  maskQuestion() {
    const { answer } = this.currentQuestion

    new Array(answer.length).fill('').map(r => {
      this.answer.push(false)
    })
  }

  getTopEmoji(index) {
    if (index === 1) return '🥇'
    if (index === 2) return '🥈'
    if (index === 3) return '🥉'
    return '▫️'
  }

  getReward(index) {
    if (index === 1) return 'Награда: 10'
    if (index === 2) return 'Награда: 5'
    if (index === 3) return 'Награда: 2'
    return ''
  }

  randomShow() {
    if (!this.active) return true
    const random = this.getRandomIndex()

    console.log(random)

    this.answer[random] = true

    this.sendAnswer(this.showAnswer())

    if (this.closeQuestion()) return true
    
    return false
  }

  showAnswer() {
    const getAnswer = this.currentQuestion.answer.split('')

    const result = this.answer.map((r, i) => r ? getAnswer[i] : '-').join('')
    
    return result
  }

  sendAnswer(show) {
    this.quizChannel.send(`_Подсказка_\n\`${show}\``)
  }

  get currentQuestion() {
    const question = this.questions[this.currentQuestionIndex]

    return question
  }

  checkAnswer(content) {
    content = content.toLowerCase()

    const question = this.currentQuestion

    return question.answer.toLowerCase() === content
  }

  onMessage(msg) {
    if (!this.checkAnswer(msg.content)) return

    let findIndex = this.players.findIndex(r => r.id === msg.author.id)

    if (findIndex < 0) {
      this.players.push({
        id: msg.author.id,
        correct: 0
      })
      findIndex = this.players.findIndex(r => r.id === msg.author.id)
    }

    this.players[findIndex].correct++
    
    this.correctAnswerMessage(msg.author)

    clearInterval(this.interval)

    this.loadNextQuestion()
  }

  closeQuestion() {
    for (const type of this.answer) {
      if (!type) return false
    }

    return true
  }

  correctAnswerMessage(author, answer = this.currentQuestion.answer) {
    this.quizChannel.send(`${author} ответил верно на вопрос. Верный ответ: ${answer}`)
  }

  getRandomIndex() {
    if (!this.active) return false
    const check = () => {
      const random = Math.floor(Math.random() * this.answer.length)

      if (this.answer[random]) return this.getRandomIndex()

      return random
    }
    return check()
  }
}

module.exports = Quiz
