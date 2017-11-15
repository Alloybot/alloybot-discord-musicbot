/********************
* NonShitMusicBot.js
* Command: clear.js
*********************/

module.exports = function(Module) {
  Module['clear'] = {
    call: main,
    category: 'command',
    command: {
      description: `Searches `,
      name: 'clear',
      prefix: '>',
      type: 'playlist'
    }
  }
}

function main(Message) {
  const Core = require('../index.js');
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
