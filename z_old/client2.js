var client = require('./client.js');




var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  
  client.cliente('s','hola', 'c2');
  if (key && key.name == 'c') {
    process.stdin.stop();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();


client.cliente('r','hola', 'c2');