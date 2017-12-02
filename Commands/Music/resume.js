/********************
* Alloybot Discord Musicbot
* Command: resume.js
*********************/

module.exports = function(Modules, Commands) {
  Modules['resume'] = main;
  const _INFO = {
    name: `resume`,
    desc: `Resumes the currently paused song, if any.`,
    _TYPE: `Music`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof Commands === 'array') Commands.push(_INFO);
}

function main(Message) {
  const Core = require('../../nsmb.js');
  let self = { Core: Core }, Dispatcher;

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) };

  if (VoiceConnection.dispatcher) { Dispatcher = VoiceConnection.dispatcher; resume() }
  else { Message.channel.send(`There is no music playing.`) };

  function resume() {
    Dispatcher.resume();
    Message.channel.send(`Resumed.`);
  }
}
