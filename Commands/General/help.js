/********************
* Alloybot Discord Musicbot
* Command: help.js
*********************/

module.exports = function(Modules, ModuleInfo) {
  Modules['help'] = main;
  const _INFO = {
    name: `help`,
    desc: `Displays all commands that the bot has in the users DM's.`,
    _TYPE: `General`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof ModuleInfo === 'array') ModuleInfo.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Embed = new Core.DiscordJS.RichEmbed();
  Embed.setColor('RED');
  Embed.setFooter('Alloybot - Music', Core.DiscordBot.user.avatarURL);

  let HelpOBJ = {
    General: [],
    Music: [],
    Playlist: [],
    Voice: []
  };

  for (Info in Core.ModuleInfo) {
    HelpOBJ[Info._TYPE].push(Info);
  }

  function parseInfo(type) {
    let string = '';
    for (let i = 0; i < HelpOBJ[type].length; i++) {
       if (i != (HelpOBJ[type].length - 1)) {
         string += `${HelpOBJ[type][i].name} // ${HelpOBJ[type][i].desc}\r\n`;
       } else {
         string += `${HelpOBJ[type][i].name} // ${HelpOBJ[type][i].desc}`;
       }
    }
    Embed.fields.push({name: type, value: string});
  }

  Message.author.createDM(function(DMChannel) {
    parseInfo('General');
    parseInfo('Music');
    parseInfo('Playlist');
    parseInfo('Voice');
    DMChannel.send(Embed);
  });
}
