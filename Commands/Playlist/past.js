/********************
* Alloybot Discord Musicbot
* Command: past.js
*********************/

module.exports = function(Modules, ModuleInfo) {
  Modules['past'] = main;
  const _INFO = {
    name: `past`,
    desc: `Lists the songs that have already played.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  if (typeof ModuleInfo === 'array') ModuleInfo.push(_INFO);
}

function main() {
  
}
