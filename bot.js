const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');

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
if(message.content.startsWith(prefix + '1')) {
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Aksel.png"]})
}     
});
    
client.on('guildMemberAdd', member => {
    member.guild.channels.get('726516853643673722').send('<:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> **' + member.user + '**, Welcome warrior! <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> \n Read the guild rules: <#726793029284790282>.');
    });
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
