const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
bot.on('guildMemberAdd', member => {
      message.channel..send("Добро пожаловать на сервер!");
});

var prefix = '!'
client.on('message', message => {
    if(message.author === client.user) return;
if(message.content.startsWith(prefix + 'say')) {
  if(message.author.id !== '251033485551075328') return
    const args = message.content.slice(prefix.length).split('say');
      message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
             message.channel.sendMessage(message.content.slice(prefix.length).split('say'));
}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
