'use strict';

Object.defineProperty(exports, "__esModule", {
  'value': true
});
const {
  france
} = require("../framework/france");
france({
  'nomCom': "repo",
  'reaction': '✅'
}, async (_0x3b5c5b, _0x36008e, _0x2f66cd) => {
  const _0x20e692 = await fetch("https://api.github.com/repos//kibore-og/kb");
  const _0x3283f0 = await _0x20e692.json();
  if (_0x3283f0) {
    const _0x5a2f21 = {
      'stars': _0x3283f0.stargazers_count,
      'forks': _0x3283f0.forks_count
    };
    const _0x263678 = "\n*A Total of " + _0x5a2f21.forks + " Fork and starX20https://github.com/kibore-og/kb.*\n\n*" + _0x5a2f21.stars + " People have starred it as a sign of Loving it._\n\n*Keep Using KIBORE_MD \n\n             _Made With_ love";
    await _0x36008e.sendMessage(_0x3b5c5b, {
      'image': {
        'url': 'https://files.catbox.moe/t9jjm9.jpg'
      },
      'caption': _0x263678
    });
  } else {
    console.log("Could not fetch data");
  }
});
