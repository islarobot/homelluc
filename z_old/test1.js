

var child = require('child_process').execFile('projects/source/ino', 
[ 
    'build' 
], function(err, stdout, stderr) { 
    // Node.js will invoke this callback when the 
    console.log(stdout); 
}); 