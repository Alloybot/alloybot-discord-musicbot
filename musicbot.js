module.exports = function(module, callback) {
  alloybot.get('modules').set('discord-musicbot', {});
  let commander = alloybot.get('modules').get('commander');

  callback(1);
};
