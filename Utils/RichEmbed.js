/********************
* NonShitMusicBot.js
* Lib: RichEmbed
*********************/

module.exports = function(Modules) {
  Modules['Libs']['RichEmbed'] = main;
}

function main() {
  const Core = require('../nsmb.js');
  const EmbedTemplate = Core.DB.get('RichEmbedTemplate');
  let Embed = new Core.DiscordJS.RichEmbed();

  Embed.footer = EmbedTemplate.footer;
  Embed.color = EmbedTemplate.color;

  return Embed;
}
