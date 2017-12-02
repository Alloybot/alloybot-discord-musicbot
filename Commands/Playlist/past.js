/********************
* Alloybot Discord Musicbot
* Command: past.js
*********************/

module.exports = function(Modules) {
  Modules['past'] = main;
  const _INFO = {
    name: `past`,
    desc: `Lists the songs that have already played.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof Commands === 'array') Commands.push(_INFO);
}
