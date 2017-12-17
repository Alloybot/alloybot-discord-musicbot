/********************
* Alloybot Discord Musicbot
* Command: playing.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `playing`,
    desc: `Says what song is currently playing.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['playing'] = main;
  Modules.Info.push(_INFO);
}

function main() {

}
