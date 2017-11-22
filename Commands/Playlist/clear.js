/********************
* NonShitMusicBot.js
* Command: clear.js
*********************/

module.exports = function(Module, Commands) {
  Module['clear'] = main;
  const _INFO = {
    name: `clear`,
    desc: ``
  }
  if (typeof Commands === 'array') Commands.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let self = { Core: Core };

  if (Core.DB.has('Playlists')) {
    let Playlists = Core.DB.get('Playlists');
    if (Playlists[Message.guild.id]) {
      Playlists[Message.guild.id].reset();
      Core.DB.put('Playlists', Playlists);
      Message.channel.send(`Cleared the playlist.`);
    } else {
      Message.channel.send(`The playlist is empty.`);
    }
  } else {
    Message.channel.send(`The playlist is empty.`);
  }
}
