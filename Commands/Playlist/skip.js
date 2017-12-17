/********************
* NonShitMusicBot.js
* Command: skip.js
*********************/

module.exports = function(Modules, ModuleInfo) {
  Modules['skip'] = main;
  const _INFO = {
    name: `skip`,
    desc: `Skips the current song.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof ModuleInfo === 'array') ModuleInfo.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let self = { Core: Core }, Playists, VoiceConnection, Dispatcher, Opts;

  if (Core.DB.has('Playlists')) { Playlists = Core.DB.get('Playlists') }
  else { Playlists = {}; Core.DB.put('Playlists', Playlists) };

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) }

  if (VoiceConnection.dispatcher) { Dispatcher = VoiceConnection.dispatcher }
  else { Message.channel.send(`There is no music playing.`) };

  if (Playlists[Message.guild.id].hasNext() && VoiceConnection) { skip() }

  function skip() {
    Playlists[Message.guild.id].next().then(function(bool) {
      if (bool) {
        Dispatcher.end('Skipped');
        self.Core.Modules.Commands.play(Message);
      }
    }).catch(function(error) {
      console.error(error);
    })
  }
}
