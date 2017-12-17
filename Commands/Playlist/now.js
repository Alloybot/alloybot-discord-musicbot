/********************
* Alloybot Discord Musicbot
* Command: now.js
*********************/

module.exports = function(Modules, ModuleInfo) {
  Modules['now'] = main;
  const _INFO = {
    name: `now`,
    desc: `Lists the upcoming songs in the playlist.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof ModuleInfo === 'array') ModuleInfo.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Playlists, PastPlaylists, Embed = Core.Modules.RichEmbed(), PastEmbed = Core.Modules.RichEmbed();

  let Content = Message.content.split(' ');
  let Comm = '';
  Content.shift();
  Comm = Content.shift();

  if (Core.DB.has('Playlists')) { Playlists = Core.DB.get('Playlists') }
  else { Playlists = {}; Core.DB.put('Playlists', Playlists) };

  if (Core.DB.has('PastPlaylists')) { PastPlaylists = Core.DB.get('PastPlaylists') }
  else { PastPlaylists = {}; Core.DB.put('PastPlaylists', PastPlaylists) };

  if (Playlists[Message.guild.id] && Comm === 'now') { list() }
  else if (!Playlists[Message.guild.id] && Comm === 'now') { Message.channel.send(`The current playlist is empty.`) };

  if (PastPlaylists[Message.guild.id] && Comm === 'past') { pastList() }
  else if (!PastPlaylists[Message.guild.id] && Comm === 'past') { Message.channel.send(`The past playlist is empty.`) };

  if (!Comm) { Message.channel.send(`The subcommands for \`>list\` are \`now\` and \`past\``) };

  function list() {
    for (i in Playlists[Message.guild.id]) {
      if (i >= Playlists[Message.guild.id].pos) {
        let song = Playlists[Message.guild.id][i];
        i = Number(i) + 1;
        Embed.addField(`Song #${i}`, song.title);
      }
    }
    Message.channel.send(`Current Playlist`, Embed);
  }

  function pastList() {
    for (i in PastPlaylists[Message.guild.id]) {
      if (i >= PastPlaylists[Message.guild.id].pos) {
        let song = PastPlaylists[Message.guild.id][i];
        i = Number(i) + 1;
        PastEmbed.addField(`Song #${i}`, song.title);
      }
    }
    Message.channel.send(`Previously Played`, PastEmbed);
  }
}
