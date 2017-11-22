/********************
* NonShitMusicBot.js
* Lib: RichEmbed
*********************/

module.exports = function(Modules) {
  Modules['RichEmbed'] = main;
}

function main() {
  const Core = require('../index.js');
  const EmbedTemplate = Core.DB.get('RichEmbedTemplate');
  let Embed = new Core.DiscordJS.RichEmbed();

  Embed.footer = EmbedTemplate.footer;
  Embed.color = EmbedTemplate.color;

  return Embed;
}
