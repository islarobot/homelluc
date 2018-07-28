var http = require('http');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
var errorhandler = require('errorhandler');
app.use(errorhandler()); // development only
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var c1 = io.of('/c1');
var c2 = io.of('/c2');

c1.on('connection', function (socket) {
    socket.on('message', function (p1, fn) {
    console.log('client sent '+p1);
        // do something useful
        fn(0, 'some data'); // success
    });
});

c2.on('connection', function (socket) {
	
//emitir mensajes	al cliente 2
	
	
socket.send('test'); 	
	
//recibir mensajes del cliente 2

socket.on('message', function (p1, fn) {
    console.log('client sent '+p1);
        
  		     
        
//        fn(0, 'some data'); // success
});





});

server.listen(8080);



