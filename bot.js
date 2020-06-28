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

@client.event
async def on_member_join(member):
        channel = member.guild.system_channel
        if channel is not None:
            await channel.send('Приветствую, {0.mention}.'.format(member));
}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
