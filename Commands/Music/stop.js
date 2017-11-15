/********************
* NonShitMusicBot.js
* Command: stop.js
*********************/

module.exports = function(Modules) {
  Modules['Commands']['stop'] = main;
}

function main(Message) {
  const Core = require('../index.js');
  let self = { Core: Core }, Dispatcher, VoiceConnection;

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection; stop() }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) };

  function stop() {
    VoiceConnection.disconnect();
    Message.channel.send(`Stopped.`);
  }
}
