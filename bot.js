const Discord = require('discord.js');

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('guildMemberAdd', member => {
   member.guild.channels.get('432864200864301059').send('<:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591> **' + member.user + '**, приветствую тебя, Воин! <:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591><:Prisoedinenie:572126670929133591> \n Прочти правила сервера, чтобы не налажать: <#464435496773484554>.');
 });


client.on('guildMemberRemove', member => {
   member.guild.channels.get('432864200864301059').send('<:Nadzor:460625006045429778><:Nadzor:460625006045429778><:Nadzor:460625006045429778><:Nadzor:460625006045429778><:Nadzor:460625006045429778> **' + member.user + '**, беги! Жалкий трус! <:Nadzor:460625006045429778><:Nadzor:460625006045429778><:Nadzor:460625006045429778><:Nadzor:460625006045429778><:Nadzor:460625006045429778>');
   // channel-id - Надо вводить ид канала куда будет писаться это сообщение
});

var prefix = '!'

 client.on('message', message => {
   
    if(message.author === client.user) return;

   //Произвольные сообщения от имени Валерии
	 if(message.content.startsWith(prefix + 'say')) {
  if(message.author.id == '386834372466049024' //@NordTort#9714
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
