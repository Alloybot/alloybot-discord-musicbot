/********************
* NonShitMusicBot.js
* Command: setdj.js
*********************/

module.exports = function(Modules) {
  Modules['Commands']['setdj'] = main;
}

function main(Message) {
  const Core = require('../index.js');
  let self = { Core: Core }, CurrentDJs;

  if (Core.DB.has('CurrentDJs')) { CurrentDJs = Core.DB.get('CurrentDJs'); setdj() }
  else { CurrentDJs = {}; setdj() }

  function setdj() {
    if (CurrentDJs[Message.guild.id] === undefined) { CurrentDJs[Message.guild.id] = Message.author.id }
    else if (CurrentDJs[Message.guild.id] === Message.author.id && Message.mentions.users.firstKey() !== undefined && Message.mentions.users.firstKey() !== Core.DiscordBot.user.id) { CurrentDJs[Message.guild.id] = Message.mentions.users.firstKey() }
    else if (CurrentDJs[Message.guild.id] === Message.author.id && Message.mentions.users.firstKey() !== undefined && Message.mentions.users.firstKey() === Core.DiscordBot.user.id) { Message.channel.send(`I cannot assign myself as the DJ.`) };
    Message.channel.send(`The Current DJ is now <@${CurrentDJs[Message.guild.id]}>.`);
    Core.DB.put('CurrentDJs', CurrentDJs);
  }
}
