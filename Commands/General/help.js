/********************
* NonShitMusicBot.js
* Command: help.js
*********************/

module.exports = function(Modules, Commands) {
  Modules['help'] = main;
  const _INFO = {
    name: `help`,
    desc: `Displays all commands that the bot has in either the current channel or DM's.`,
    _TYPE: `General`,
    _DISABLED: false,
    _REASON: undefined,
    sub: [
      {
        name: `here`,
        desc: `Displays all commands in the current channel.`,
        _DISABLED: false,
        _REASON: undefined
      },
      {
        name: `dms`,
        desc: `Displays all commands in the User's DMs.`,
        _DISABLED: false,
        _REASON: undefined
      }
    ]
  }
  if (typeof Commands === 'array') Commands.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  const FS = require('fs');
  let self = { Core: Core }, Sub, Content;

  Content = Message.content.split(' ');
  Content.shift();
  Sub = Content.shift();

  if (Core.DB.has('HelpMsg')) {
    let HelpMsg = Core.DB.get('HelpMsg');
    send(HelpMsg);
  } else {
    let HelpMsg = Core.DB.get('RichEmbedTemplate');
    let Description = ''
    for (i in CommandList) Description = Description + `>${CommandList[i].replace('.js', '')}\r\n`
    HelpMsg.addField('Command List', Description);
    Core.DB.put('HelpMsg', HelpMsg);
    send(HelpMsg);
  }

  function send(ToSend) {
    if (Sub && Sub.toLowerCase() === 'dm') {
      Message.author.createDM()
      .then(function(Channel) {
        Channel.send(ToSend);
      }).catch(function(error) {
        console.error(error);
      });
    } else if (Sub && Sub.toLowerCase() === 'here') {
      Message.channel.send(ToSend);
    } else if (Sub === undefined) {
      Message.channel.send(`The subcommands for \`>help\` are \`dm\` and \`here\``);
    }
  }
}
