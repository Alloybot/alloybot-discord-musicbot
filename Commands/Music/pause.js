/********************
* NonShitMusicBot.js
* Command: pause.js
*********************/

module.exports = function(Modules) {
  Modules['Commands']['pause'] = main;
}

function main(Message) {
  const Core = require('../index.js');
  let self = { Core: Core };
  let Dispatcher, VoiceConnection;

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) };

  if (VoiceConnection.dispatcher) { Dispatcher = VoiceConnection.dispatcher; pause() }
  else { Message.channel.send(`There is no music playing.`) };

  function pause() {
    Dispatcher.pause();
    Message.channel.send(`Paused.`);
  }
}
