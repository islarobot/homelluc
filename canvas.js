

var fs = require('fs');
var text2png = require('text2png');

fs.writeFileSync('1.png', text2png('Hello!\npepe', {textColor: 'blue'}));