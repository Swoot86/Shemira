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
  .then(msg => console.log(Deleted message from ${msg.author.username}))
  .catch(console.error);
             message.channel.sendMessage(message.content.slice(prefix.length).split('say'));
}
if(message.content.startsWith(prefix + '1')) {
          message.delete()
    .then(msg => console.log(Deleted message from ${msg.author.username}))
    .catch(console.error);
  message.channel.send({files: ["./6Dx0lgr0gws.png"]})
}
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get('775638198616719363').send(':10: :10: :10: :10: :10: ' + member.user + ', приветствую тебя, Импостер! :91: :91: :91: :91: :91: \n Прочти правила сервера, чтобы не налажать: #📝правила📝.');
});

client.on('guildMemberRemove', member => {
   member.guild.channels.get('775638198616719363').send(':11::11::11::11::11: ' + member.user + ', беги! Жалкий трус! :11::11::11::11::11:');
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
