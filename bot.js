const Discord = require('discord.js');

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
 if(client.User.role.id !== '543916621522272262') return;
    member.guild.channels.get('775638198616719363').send(' TEXT **' + member.user + '**, TEXT.');
 });

client.on('guildMemberAdd', member => {
    member.guild.channels.get('775719425264844851').send('<:radioactive:776196737551302666> <:radioactive:776196737551302666> <:radioactive:776196737551302666> <:radioactive:776196737551302666> <:radioactive:776196737551302666> **' + member.user + '**, Приветствую тебя, Импостер! <:radioactive:776196737551302666> <:radioactive:776196737551302666> <:radioactive:776196737551302666> <:radioactive:776196737551302666> <:radioactive:776196737551302666> \n Прочти правила сервера, чтобы не налажать: <#775669660062056468>.');
    });


client.on('guildMemberRemove', member => {
   member.guild.channels.get('775638198616719363').send('<:warning:776206121311404062><:warning:776206121311404062><:warning:776206121311404062><:warning:776206121311404062><:warning:776206121311404062> ' + member.user + ', беги! Жалкий трус! <:warning:776206121311404062><:warning:776206121311404062><:warning:776206121311404062><:warning:776206121311404062><:warning:776206121311404062>');
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
   //Ставки на 1х1
   if(message.content.startsWith(prefix + 'duel')) {
  if(message.author.id == '386834372466049024' //@NordTort#9714
 || message.author.id == '435498881040777231' //@White Rabbit#4620
  || message.author.id !== '331129112598937600' //@cq-w9gfo#9491 
  || message.author.id !== '523946123606491151' //@ivan-baraban#2410
  || message.author.id !== '253263899556708353' //@StereoType#8186
  || message.author.id !== '440835676586377227') { //@Pakicetus#5323 
    const args = message.content.slice(prefix.length);
	  message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
     		message.channel.sendMessage('**' + message.content.slice(prefix.length) + '** \n <:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058> @here <:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058> \n Граждане Имперского города! Делайте ваши ставки! Кто одержит верх в схватке - <#501870581226930188>?');
      	 }
         else {
           return;
         }
   }
   // Ставки на ек
   if(message.content.startsWith(prefix + 'ek')) {
  if(message.author.id == '386834372466049024' //@NordTort#9714
  || message.author.id == '435498881040777231' //@White Rabbit#4620
  || message.author.id !== '331129112598937600' //@cq-w9gfo#9491 
  || message.author.id !== '523946123606491151' //@ivan-baraban#2410
  || message.author.id !== '253263899556708353' //@StereoType#8186
  || message.author.id !== '440835676586377227') { //@Pakicetus#5323 
    const args = message.content.slice(prefix.length);
   message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
         message.channel.sendMessage('**' + message.content.slice(prefix.length) + '** \n <:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058> @here <:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058><:KolesoUdachi:469348898058797058> \n Граждане Имперского города! Делайте ваши ставки! Кто одержит верх в сражении - <#456835687052738571>?');
        }
         else {
           return;
         }
   }
   //Сражение
   if(message.content.startsWith(prefix + 'battle')) {
           message.delete()
     .then(msg => console.log(`Deleted message from ${msg.author.username}`))
     .catch(console.error);
   message.channel.send({
     embed: {
       thumbnail: {
            url: 'attachment://file.sav'
         }
      },
      files: [{
         attachment: 'https://github.com/NorthTort/Valeria/raw/master/HOMM5_Editor_Theory_rus.pdf',
         name: 'HOMM5_Editor_Theory_rus.pdf'
      }]
   })
   .then(console.log)
   .catch(console.error);
   }
   //Карта
   if(message.content.startsWith(prefix + 'map')) {
           message.delete()
     .then(msg => console.log(`Deleted message from ${msg.author.username}`))
     .catch(console.error);
   message.channel.send({
     embed: {
       thumbnail: {
            url: 'attachment://file.h5m'
         }
      },
      files: [{
         attachment: 'https://github.com/NorthTort/Valeria/raw/master/Tri_Dorogi.h5m',
         name: 'Tri Dorogi.h5m'
      }]
   })
   .then(console.log)
   .catch(console.error);
   }
 	//Отправка арта победителя
    //Орден Порядка
      //Аксель
  if(message.content.startsWith(prefix + 'aksel')) {
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Aksel.png"]})
  } 
      //Эллайна
  if(message.content.startsWith(prefix + 'allaina')) {
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Allaina.png"]})
  } 
      //Дугал   
  if(message.content.startsWith(prefix + 'dugal')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Dugal.png"]})
  }  
      //Айрис
  if(message.content.startsWith(prefix + 'iris')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Iris.png"]})
  } 
      //Ласло
  if(message.content.startsWith(prefix + 'laslo')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Laslo.png"]})
  }  
      //Мив
  if(message.content.startsWith(prefix + 'miv')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Miv.png"]})
  }
      //Рутгер
  if(message.content.startsWith(prefix + 'rutger')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Rutger.png"]})
  }
      //Витторио
  if(message.content.startsWith(prefix + 'vittorio')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Human/Vittorio.png"]})
  }  
    //Лесной Союз
      //Анвен
  if(message.content.startsWith(prefix + 'anwen')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Anwen.png"]})
  }  
      //Дираэль
  if(message.content.startsWith(prefix + 'dirael')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Dirael.png"]})
  }
      //Гильраэн 
  if(message.content.startsWith(prefix + 'gilraen')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Gilraen.png"]})
  }   
      //Ильфина
  if(message.content.startsWith(prefix + 'ilfina')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Ilfina.png"]})
  }  
      //Оссир
  if(message.content.startsWith(prefix + 'ossir')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Ossir.png"]})
  }  
      //Таланар
  if(message.content.startsWith(prefix + 'talanar')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Talanar.png"]})
  }  
      //Вингаэль
  if(message.content.startsWith(prefix + 'vingael')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Vingael.png"]})
  }  
      //Винраэль
  if(message.content.startsWith(prefix + 'vinrael')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Elf/Vinrael.png"]})
  }
    //Академия Волшебства
      //Джалиб
  if(message.content.startsWith(prefix + 'djalib')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Djalib.png"]})
  }  
      //Фаиз
  if(message.content.startsWith(prefix + 'faiz')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Faiz.png"]})
  }
      //Хафиз
  if(message.content.startsWith(prefix + 'hafiz')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Hafiz.png"]})
  }
      //Нархиз
  if(message.content.startsWith(prefix + 'narhiz')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Narhiz.png"]})
  }
      //Назир
  if(message.content.startsWith(prefix + 'nazir')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Nazir.png"]})
  }
      //Нура
  if(message.content.startsWith(prefix + 'nura')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Nura.png"]})
  }  
      //Ора
  if(message.content.startsWith(prefix + 'ora')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Ora.png"]})
  }
      //Раззак
  if(message.content.startsWith(prefix + 'razzak')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Mag/Razzak.png"]})
  }
    //Северные Кланы
      //Эрлинг
  if(message.content.startsWith(prefix + 'arling')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Arling.png"]})
  }
      //Бранд
  if(message.content.startsWith(prefix + 'brand')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Brand.png"]})
  }
      //Хельмар
  if(message.content.startsWith(prefix + 'helmar')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Helmar.png"]})
  }
      //Ибба
  if(message.content.startsWith(prefix + 'ibba')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Ibba.png"]})
  }
      //Инга
  if(message.content.startsWith(prefix + 'inga')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Inga.png"]})
  }
      //Ингвар
  if(message.content.startsWith(prefix + 'ingvar')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Ingvar.png"]})
  }
      //Карли
  if(message.content.startsWith(prefix + 'karli')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Karli.png"]})
  }
      //Свея
  if(message.content.startsWith(prefix + 'sveya')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Gnom/Sveya.png"]})
  }
    //Великая Орда
      //Аргат
  if(message.content.startsWith(prefix + 'argat')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Argat.png"]})
  }
      //Гаруна
  if(message.content.startsWith(prefix + 'garuna')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Garuna.png"]})
  }
      //Гошак
  if(message.content.startsWith(prefix + 'goshak')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Goshak.png"]})
  }
      //Хаггеш
  if(message.content.startsWith(prefix + 'haggesh')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Haggesh.png"]})
  }
      //Киган
  if(message.content.startsWith(prefix + 'kigan')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Kigan.png"]})
  }
      //Краг
  if(message.content.startsWith(prefix + 'krag')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Krag.png"]})
  }
      //Шак-Каррукат
  if(message.content.startsWith(prefix + 'shak')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Shak'Karrukat.png"]})
  }
      //Тилсек
  if(message.content.startsWith(prefix + 'tilsek')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Ork/Tilsek.png"]})
  }
    //Инферно
      //Аластор
  if(message.content.startsWith(prefix + 'alastor')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Alastor.png"]})
  }
      //Делеб
  if(message.content.startsWith(prefix + 'deleb')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Deleb.png"]})
  }  
      //Джезебет
  if(message.content.startsWith(prefix + 'djezebet')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Djezebet.png"]})
  }  
      //Грок
  if(message.content.startsWith(prefix + 'grok')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Grok.png"]})
  }  
      //Грол
  if(message.content.startsWith(prefix + 'grol')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Grol.png"]})
  }  
      //Марбас
  if(message.content.startsWith(prefix + 'marbas')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Marbas.png"]})
  }  
      //Ниброс
  if(message.content.startsWith(prefix + 'nibros')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Nibros.png"]})
  }  
      //Нимус
  if(message.content.startsWith(prefix + 'nimus')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Demon/Nimus.png"]})
  }  
    //Лига Теней
      //Эрин
  if(message.content.startsWith(prefix + 'erin')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Erin.png"]})
  } 
      //Иранна
  if(message.content.startsWith(prefix + 'iranna')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Iranna.png"]})
  }  
      //Ирбет
  if(message.content.startsWith(prefix + 'irbet')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Irbet.png"]})
  }  
      //Кифра
  if(message.content.startsWith(prefix + 'kifra')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Kifra.png"]})
  }  
      //Летос
  if(message.content.startsWith(prefix + 'letos')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Letos.png"]})
  }  
      //Синитар
  if(message.content.startsWith(prefix + 'sinitar')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Sinitar.png"]})
  }  
      //Соргал
  if(message.content.startsWith(prefix + 'sorgal')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Sorgal.png"]})
  }  
      //Вайшан 
  if(message.content.startsWith(prefix + 'vaishan')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/DarkElf/Vaishan.png"]})
  }
    //Некрополис
      //Дейдра
  if(message.content.startsWith(prefix + 'deidra')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Deidra.png"]})
  }
      //Каспар
  if(message.content.startsWith(prefix + 'kaspar')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Kaspar.png"]})
  }
      //Лукреция
  if(message.content.startsWith(prefix + 'luckrecia')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Luckrecia.png"]})
  }
      //Наадир
  if(message.content.startsWith(prefix + 'naadir')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Naadir.png"]})
  }
      //Орсон
  if(message.content.startsWith(prefix + 'orson')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Orson.png"]})
  }
      //Равенна
  if(message.content.startsWith(prefix + 'ravenna')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Ravenna.png"]})
  }
      //Влад
  if(message.content.startsWith(prefix + 'vlad')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Vlad.png"]})
  }
      //Золтан
  if(message.content.startsWith(prefix + 'zoltan')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Win hero/Nekr/Zoltan.png"]})
  }  
  //Арт Рейтинга
  if(message.content.startsWith(prefix + 'rating')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Rating1.png"]})
  message.channel.send({files: ["./Rating2.png"]})
  message.channel.send({files: ["./Rating3.png"]})
  message.channel.send({files: ["./Rating4.png"]})
  message.channel.send({files: ["./Rating5.png"]})
  message.channel.send({files: ["./Rating6.png"]})
  }  
  if(message.content.startsWith(prefix + 'ratin1')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
  message.channel.send({files: ["./Rating7.png"]})
  message.channel.send({files: ["./Rating8.png"]})
  }  
  // Арты победителя
if(message.content.startsWith(prefix + 'hero')) {
        message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
message.channel.send({
  embed: {
    thumbnail: {
         url: 'attachment://file.png'
      }
   },
   files: [{
      attachment: 'https://downloader.disk.yandex.ru/preview/64a6ca5205ce078c218d3e8d022bc1ee632c4d4e2f94be80b06a846fe8dae3a6/5f38a41c/uDea8HaPafLpf_V17AI-KQHLDJJ5kO_BLeqj5luo6OT_MfgVqotVvhEaA8w6Vhrlx7qjpA2mNjRdxUtSwYblDQ==?uid=0&filename=mem.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&tknv=v2&owner_uid=432648688&size=2048x2048',
      name: 'Hero.png'
   }]
})
.then(console.log)
.catch(console.error);
}
//Карты
  //1х1
    //Три Дороги
if(message.content.startsWith(prefix + 'tridorogi')) { 
        message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
message.channel.send({files: ["./Maps/1x1/Tri_Dorogi.h5m"]})
message.channel.send({files: ["./Maps/1x1/Tri Dorogi.png"]})
}
    //ФРФБ
if(message.content.startsWith(prefix + 'frfb')) { 
        message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
  .catch(console.error);
message.channel.send({files: ["./Maps/1x1/FRFB-1_3_1_N.h5m"]})
message.channel.send({files: ["./Maps/1x1/FRFB.png"]})
}
    //Слушая Тишину
    if(message.content.startsWith(prefix + 'listosil')) { 
            message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
    message.channel.send({files: ["./Maps/1x1/Listen_silencev1_2_1 TotE_Rus.h5m"]})
    message.channel.send({files: ["./Maps/1x1/Listening to Silence.png"]})
    }  
  //FFA
    //Гиперборея
if(message.content.startsWith(prefix + 'hyberborey')) { 
      message.delete()
.then(msg => console.log(`Deleted message from ${msg.author.username}`))
.catch(console.error);
message.channel.send({files: ["./Maps/FFA/Hyberborey_v.1.0.h5m"]})
message.channel.send({files: ["./Maps/FFA/Hyberborey.png"]})
}
    //Сопряжение
    if(message.content.startsWith(prefix + 'conjugation')) { 
          message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);
    message.channel.send({files: ["./Maps/FFA/Conjugation.h5m"]})
    message.channel.send({files: ["./Maps/FFA/Conjugation.png"]})
    }
    //Spiral
    if(message.content.startsWith(prefix + 'spiral')) { 
            message.delete()
      .then(msg => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
    message.channel.send({files: ["./Maps/FFA/Spiral.h5m"]})
    message.channel.send({files: ["./Maps/FFA/Spiral_2x2x2.h5m"]})
    message.channel.send({files: ["./Maps/FFA/Spiral_3x3.h5m"]})
    message.channel.send({files: ["./Maps/FFA/Spiral.png"]})
    }
//Калькулятор
let messageArray = message.content.split(" ");
let args = messageArray.slice(1);
    if(message.content.startsWith(prefix + 'calc')) {
const sayMessage1 = args.join(" ");
        message.channel.send(eval(sayMessage1))
     }

 });
 
client.on

client.login(process.env.BOT_TOKEN);
