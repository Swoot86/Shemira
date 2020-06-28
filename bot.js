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
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get('726473841508876348').send('<:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> **' + member.user + '**, приветствую тебя, Воин! <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> <:krylatyjzashhitnik01:726515001946538065> \n Прочти правила сервера, чтобы не налажать: <#464435496773484554>.');
    });

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
