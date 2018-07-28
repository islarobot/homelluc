var path = 'projects/source/'

var spawn = require('child_process').spawn,
    ino    = spawn('ino', ['upload'],{cwd: 'projects/source/'});

ino.stdout.on('data', function (data) {
  console.log('stdout: ' + data.toString());
});

ino.stderr.on('data', function (data) {
  console.log('stderr: ' + data.toString());
});

ino.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});