require('dotenv').config({ path: './private.env' });
const FS = require('fs');
const PathModule = require('path');
const FlatFile = require('flat-file-db');
const DiscordJS = require('discord.js');
const DiscordBot = new DiscordJS.Client();
const Cassette = require('cassette');
const YouTubeAPI = require('googleapis');
const Tracer = require('tracer');
const Chalk = require('chalk');
const YTService = new Cassette.YouTubeService(process.env.YOUTUBE_API_KEY);
let Modules = {}, DB = FlatFile.sync('./data.db'), Globals = {}, ModuleInfo = [];
DB.clear();

function LoadModules(path) {
  FS.lstat(path, function(err, stat) {
    if (stat.isDirectory()) {
      let files = FS.readdirSync(path);
      let f, l = files.length;
      for (let i = 0; i < l; i++) {
        f = PathModule.join(path, files[i]);
        LoadModules(f);
      }
    } else {
      require(path)(Modules, ModuleInfo);
    }
  });
}

let COMDIR = PathModule.join(__dirname, 'Commands');
LoadModules(COMDIR);

DiscordBot.login(process.env.DISCORD_TOKEN);
DiscordBot.on('ready', function() {
  console.log(`Connected to ${DiscordBot.guilds.size} servers.`);
});

DiscordBot.on('message', function(Message) {
  let CurrentDJs, NoPerms;
  if (DB.has('CurrentDJs')) { CurrentDJs = DB.get('CurrentDJs') }
  else { CurrentDJs = {}; DB.put('CurrentDJs', CurrentDJs) }

  function DJ() {
    if (CurrentDJs[Message.guild.id] === Message.author.id || process.env.CREATOR_ID) { return true }
    else { return false };
  }

  if (!Message.guild) { return }
  else { NoPerms = `You do not have perms to do that. Only <@${CurrentDJs[Message.guild.id]}> can control me currently.` };

  if (Message.author.id === DiscordBot.user.id) return;

  if (!Globals[Message.guild.id]) Globals[Message.guild.id] = {};

  switch (Message.content.split(' ').shift().replace('>', '').toLowerCase()) {
    case 'add':
      if (DJ()) { Modules['addyt'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'clear':
      if (DJ()) { Modules['clear'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'getdj':
      Modules['getdj'](Message);
      break;

    case 'help':
      Modules['help'](Message);
      break;

    case 'join':
      if (DJ()) { Modules['join'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'leave':
      if (DJ()) { Modules['leave'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'now':
      if (DJ()) { Modules['now'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'past':
      if (DJ()) { Modules['past'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'pause':
      if (DJ()) { Modules['pause'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'play':
      if (DJ()) { Modules['play'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'resume':
      if (DJ()) { Modules['resume'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'setdj':
      if (DJ() || CurrentDJs[Message.guild.id] === undefined) { Modules['setdj'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'skip':
      if (DJ()) { Modules['skip'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'stop':
      if (DJ()) { Modules['stop'](Message) }
      else { Message.channel.send(NoPerms) };
      break;

    case 'volume':
      if (DJ()) { Modules['volume'](Message) }
      else { Message.channel.send(NoPerms) };
      break;
  }
});

module.exports = {
  DiscordBot: DiscordBot,
  DiscordJS: DiscordJS,
  Cassette: Cassette,
  DB: DB,
  Creator: process.env.CREATOR_ID,
  Modules: Modules,
  YTService: YTService,
  Globals: Globals
}
