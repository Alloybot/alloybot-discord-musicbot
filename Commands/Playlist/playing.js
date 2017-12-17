/********************
* Alloybot Discord Musicbot
* Command: playing.js
*********************/

module.exports = function(Modules, ModuleInfo) {
  Modules['playing'] = main;
  const _INFO = {
    name: `playing`,
    desc: `Says what song is currently playing.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof ModuleInfo === 'array') ModuleInfo.push(_INFO);
}

function main() {
  
}
