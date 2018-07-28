var port = process.argv[2];
var SerialPort = require('serialport');// include the library

var sp = new SerialPort(port, {
  baudrate: 9600,
  //parser: SerialPort.parsers.readline("\n")
});


sp.on('open', onPortOpen);
sp.on('data', onData);
sp.on('close', onClose);
sp.on('error', onError);


function onPortOpen(){
    console.log("YESSIR THE PORT IS OPEN COS CAPS");
}

function onData(d)
{
    console.log("data dis, data dat "+d)
}

function onClose(){
    console.log("Port is closed, yo");
}
function onError(){
    console.log("something went horribly wrong");
}