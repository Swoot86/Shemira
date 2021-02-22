const cron = require('node-cron')
const checkVoice = require('./checkVoice')

function checker(client) {
  cron.schedule('*/1 * * * *', () => {
    checkVoice(client)
  })
}

module.exports = checker
