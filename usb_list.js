
var classes = require('./classes.js')
var io = require('socket.io-client');
var serverUrl = 'http://localhost:8080';
var conn = io.connect(serverUrl);
console.log('c5_usb running');

var ports_array = [];


//envio id
conn.emit('id', 'c5_usb', function(resp, data) {
    //console.log(message_object);
});


setTimeout(function(){
	
	 
	 setInterval(function(){ 
	 
	 envio_listado_puertos();
	 
	 }, 2000); 
	 
	 
	 }, 5000);



//recibo información
conn.on('message', function(msg){
     //console.log(msg);


var msg_object = JSON.parse(msg);



//cierre

if(msg_object.type_code == '0'){

process.exit();
}     
  
//enviar listado de puertos.  
  
if(msg_object.type_code == '2'){

envio_listado_puertos();

console.log('6. devuelvo listado de puertos a main')

}       
  
     
});

//console.logJSON.stringify((obtengo_listado_puertos()));



function envio_listado_puertos(){


var serialport = require('serialport');


// list serial ports:
serialport.list(function (err, ports) {


var response_array = ports;
	 	

var message_local = new classes.message_object('c5_usb','c1_main','1',response_array);
var message_json = JSON.stringify(message_local);
//console.log(typeof(message_local));

conn.send(message_json, function(resp, data) {});


});

}













