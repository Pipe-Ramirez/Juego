/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '💀',
    'F': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '💖',
    'Time': '⏳',
    'Record': '🥇',

  };
  var emojs = [
    {codigo:':b',class:'emoji lengua'},
    {codigo:'xD',class:'emoji XD'},
    {codigo:':)',class:'emoji smile'}    
  ]; 

  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
    maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
  O--------X
  XXXXXXXX-X
  XX-----X-X
  XX-XXX---X
  XX-XXXXXXX
  XX-XXXXXXX
  X------XXX
  --XXXXXXXX
  -XX----IXX
  ----XXXXXX
`);
