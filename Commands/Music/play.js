/********************
* Alloybot Discord Musicbot
* Command: play.js
*********************/

module.exports = function(Modules, ModuleInfo) {
 Modules['play'] = main;
 const _INFO = {
   name: `play`,
   desc: `Starts playing the music in the Playlist, starting from the top.`,
   _TYPE: `Music`,
   _DISABLED: false,
   _REASON: undefined
 }
 if (typeof ModuleInfo === 'array') ModuleInfo.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Playists, PastPlaylists, VoiceConnection, Dispatcher, Opts, Msg;
  let self = { Core: Core, this: this }, Embed = new Core.DiscordJS.RichEmbed();
  let Joined = Core.DiscordBot.voiceConnections;

  if (Core.DB.has('Playlists')) { Playlists = Core.DB.get('Playlists') }
  else { Playlists = {}; Core.DB.put('Playlists', Playlists) };

  if (Core.DB.has('PastPlaylists')) { PastPlaylists = Core.DB.get('PastPlaylists') }
  else { PastPlaylists = {}; Core.DB.put('PastPlaylists', PastPlaylists) };

  if (!Playlists[Message.guild.id]) { Playlists[Message.guild.id] = new Core.Cassette.Playlist(); Core.DB.put('Playlists', Playlists) };
  if (!PastPlaylists[Message.guild.id]) { PastPlaylists[Message.guild.id] = new Core.Cassette.Playlist(); Core.DB.put('PastPlaylists', PastPlaylists) };

  let Content = Message.content.split(' ');
  Content.shift();
  Content = Content.join(' ')
  if (Content) { Message.channel.send(`To add songs to the playlist, do >add ${Content}.`) }

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection }
  else { Message.channel.send(`I need to be connected to a channel first.`) }

  if (Playlists[Message.guild.id].current && VoiceConnection) { play(); }
  else if (!Playlists[Message.guild.id].current) { Message.channel.send(`You need to add a song to the playlist first.`) };

  function play() {
    Opts = Core.Globals[Message.guild.id].StreamOpts = { passes: 2, bitrate: 'auto' };
    let CurrentSong = Playlists[Message.guild.id][Playlists[Message.guild.id].pos];
    Dispatcher = VoiceConnection.playStream(CurrentSong.stream(), Opts);
    Embed.setColor('RED');
    Embed.setFooter('Alloybot - Music', Core.DiscordBot.user.avatarURL);
    Embed.fields = [{name: 'Song', value: CurrentSong.title}];
    Message.channel.send(`**Now Playing.**`, Embed);
    if (Playlists[Message.guild.id].pos > 0) PastPlaylists[Message.guild.id].add(Playlists[Message.guild.id][Playlists[Message.guild.id].pos - 1].streamURL, [Core.YTService]);
    Dispatcher.on('end', function(reason) {
      if (Playlists[Message.guild.id].hasNext() && reason !== 'Skipped') { advance() }
      else { VoiceConnection.disconnect(); Message.channel.send(`**No more songs in the playlist.**`) };
    });
    Core.DB.put('Playlists', Playlists);
    Core.DB.put('PastPlaylists', PastPlaylists);
  }

  function advance() {
    Playlists[Message.guild.id].next().then(function(bool) {
      if (bool) play();
    }).catch(function(error) {
      console.error(error);
    })
  }
}
