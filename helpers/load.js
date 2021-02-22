const Questions = require('../models/Question')
const { readFileSync } = require('fs')
const { connect } = require('mongoose')
require('dotenv/config')

connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => load())

function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function load() {
  const loadFile = shuffle(readFileSync('./questions.txt', 'utf-8')
      .replace(/\r/g, ''))

  const format = shuffle(loadFile.split('\n').map(r => {
    const result = r.split(' - ')

    return result
  }))

  format.map(async r => {
    const [answer, question] = r
    if (!answer || !question) return
    const findQuestion = await Questions.findOne({ question, answer })

    if (findQuestion) return
    
    await Questions.create({
      question,
      answer
    })
  })
}