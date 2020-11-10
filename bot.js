const Discord = require('discord.js');

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('guildMemberAdd', member => {
   member.guild.channels.get('775638198616719363').send('**' + member.user + '**, приветствую тебя, Черт!  \n Прочти правила сервера, чтобы не налажать.');
 });


client.on('guildMemberRemove', member => {
   member.guild.channels.get('775638198616719362').send('<:11:775741101206274058><:11:775741101206274058><:11:775741101206274058><:11:775741101206274058><:11:775741101206274058> **' + member.user + '**, беги! Жалкий трус! <:11:775741101206274058><:11:775741101206274058><:11:775741101206274058><:11:775741101206274058><:11:775741101206274058>');
   // channel-id - Надо вводить ид канала куда будет писаться это сообщение
});

var prefix = '!'

 client.on('message', message => {
   
    if(message.author === client.user) return;

   //Произвольные сообщения от имени Валерии
	 if(message.content.startsWith(prefix + 'say')) {
  if(message.author.id == '775787284070662164' //@Defo
  || message.author.id == '435498881040777231' //@White Rabbit#4620
  || message.author.id !== '331129112598937600' //@cq-w9gfo#9491 
  || message.author.id !== '523946123606491151' //@ivan-baraban#2410
  || message.author.id !== '253263899556708353' //@StereoType#8186
  || message.author.id !== '440835676586377227') { //@Pakicetus#5323 
    const args = message.content.slice(prefix.length).split('say');
	  message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
     		message.channel.sendMessage(message.content.slice(prefix.length).split('say'));
      	 }
         else {
           return;
         }
	 }
	 });
	 client.on

client.login(process.env.BOT_TOKEN);
