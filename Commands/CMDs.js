module.exports.add = {
  call: main,
  category: `command`,
  root: {
    comment: `Add songs/videos to the playlist using either SoundCloud or YouTube.`,
    name: `add`,
    _PREFIX: `>`,
    _TYPE: `playlist`,
    _DISABLED: false,
    _REASON: ``
  },
  sub: [
    {
      comment: `Searches YouTube for any video using the search terms put after the subcommand. *Grabs the first video in the search list.*`,
      name: `ytsearch`,
      _DISABLED: false,
      _REASON: ``
    },
    {
      comment: `Searches SoundCloud for any sound using the search terms put after the subcommand. *Grabs the first sound in the search list.*`,
      name: `scsearch`,
      _DISABLED: true,
      _REASON: `Not yet implemented.`
    }
  ]
}
