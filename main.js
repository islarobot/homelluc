var classes = require('./classes.js');
var io_client = require('socket.io-client');
var delayed = require('delayed');
var serverUrl = 'http://localhost:8080';
var conn = io_client.connect(serverUrl);
console.log('c1_main running');

//MODO TEST
var testmode = 1;

var usb_list_on = 0;
var ardu_on = 0;
var conectado = 0;


var exec_comms = require('child_process').exec,child;

var exec_web = require('child_process').exec,child;

var exec_usb = require('child_process').exec,child;

var exec_ardu = require('child_process').exec,child;

//var firefox_process = require('child_process').exec,child;

//var proc_firefox = require('child_process').spawn();


//valor del puerto recibido al ser seleccionado.
var puerto;


//abro terminal y ejecuto comms server

child_comms = exec_comms('gnome-terminal --title=\"Comms Server\" --geometry 73x20+900+0 -x nodejs comms_server.js',
function (error, stdout, stderr) {

    if (error !== null) {
        console.log('exec error: ' + error);
    }
});


//envio id de main

conn.emit('id', 'c1_main', function(resp, data) {
    //console.log(message_object);
});


//abro terminal y ejecuto web server

child_web = exec_web('gnome-terminal --title=\"Web Server\" --geometry 73x20+0+500 -x nodejs web_server.js',
function (error, stdout, stderr) {

    if (error !== null) {
        console.log('exec error: ' + error);
    }
});



//abro terminal y ejecuto usb_list

child_usb = exec_usb('gnome-terminal --title="USB List" --geometry 73x20+900+500 -x nodejs usb_list.js',
function (error, stdout, stderr) {

    if (error !== null) {
        console.log('exec error: ' + error);
    }
    usb_list_on = 1;
});




//recibo información del socket interno
conn.on('message', function(msg){



//parseo mensaje     
msg_object = JSON.parse(msg);  



//recibo lista usb. si es cero o mas de uno la envio a la web. si es 1 solicito conexión.

if(msg_object.type_code == '1'){

var new_portlist = [];
var portlist = msg_object.value_text;

//console.log('7 recibo puertos de usb')
//console.log('8 compruebo si hay cero, uno o varios')


for(index = 0;index < portlist.length;index++){

if (typeof portlist[index].manufacturer != 'undefined' && portlist[index].manufacturer.substring(0,7) == 'Arduino') {

new_portlist.push(portlist[index].comName);

}

}



if (new_portlist.length == 0) {

var portlist_tuple = 
{
length_portlist:0,
value:null
}
	
}	

if (new_portlist.length == 1) {

puerto = new_portlist[0]


//console.log('9 si solo hay 1 abro arducomms')
abrir_ardu_comms(puerto);
	
}	

if (new_portlist.length > 1) {

var portlist_tuple = 
{
length_portlist:1,
value:new_portlist
}
	
}

var message_local = new classes.message_object('c1_main','c3_web','1',portlist_tuple);
var message_json = JSON.stringify(message_local);

conn.send(message_json, function(resp, data) {});

//console.log('9 envio a web listado de puertos')

} 


//seleccion puerto usb

if(msg_object.type_code == '3'){

puerto = msg_object.value_text;
//abro ardu_comms
abrir_ardu_comms(puerto);





}        


//espero a que me confirme que está abierto

if(msg_object.type_code == '4'){

//envío valor del puerto

var message_local = new classes.message_object('c1_main','c4_ardu','5',puerto);
var message_json = JSON.stringify(message_local);

conn.send(message_json, function(resp, data) {});


//mando msg para cerrar usb_list

console.log('c5_usb cerrando...');

var message_local = new classes.message_object('c1_main','c5_usb','0','');
var message_json = JSON.stringify(message_local);

conn.send(message_json, function(resp, data) {});

usb_list_on = 0;

}    

//confirmo que usb_list.js está abierto.

if(msg_object.type_code == '6'){

var proceso = msg_object.value_text;

if (proceso == 'c5_usb') {

//si usb_list está abierto y ardu_cerrado no hago nada.
	
if (usb_list_on == 1 && ardu_on == 0){

//console.log('3. usb ya está abierto----------------')

//si usb_list está cerrad y ardu abierto no hago nada

}else if(usb_list_on == 0 && ardu_on == 1){

//console.log('3. ardu ya está abierto----------------')



//si los dos están cerrados abro usb list y confirmo a web que he abierto
}else if (usb_list_on == 0 && ardu_on == 0) {
abrir_usb();
console.log('abrir_usb')
var message_local = new classes.message_object('c1_main','c3_web','6','ok');
var message_json = JSON.stringify(message_local);
conn.send(message_json, function(resp, data) {});

//console.log('4. confirmo usb abierto')


	
}



}
}



if(msg_object.type_code == '10'){



//firefoxfunction(proc_firefox);

//var proc = require('child_process').spawn('google-chrome \"127.0.0.1:8070/index.html\"');


}

if(msg_object.type_code == '11'){


//abro usb_list

abrir_usb();

usb_list_on = 1;


//mando msg para cerrar ardu.

console.log('c4_ardu cerrando...');

var message_local = new classes.message_object('c1_main','c4_ardu','0','');
var message_json = JSON.stringify(message_local);

conn.send(message_json, function(resp, data) {});

ardu_on = 0;

}

if(msg_object.type_code == '22'){


//mando msg para cerrar ardu.

console.log('c4_ardu cerrando...');

var message_local = new classes.message_object('c1_main','c4_ardu','0','');
var message_json = JSON.stringify(message_local);

conn.send(message_json, function(resp, data) {});

ardu_on = 0;

}

if(msg_object.type_code == '20'){


//actualizo estado de puerto conectado

if (msg_object.value_text == '1') {

conectado = 1;
}else {

conectado = 0;

}

}



if(msg_object.type_code == '21'){


//devuelvo estado

if (ardu_on == 1) {
	//web server
	var message_local = new classes.message_object('c1_main','c3_web','20','Arduino connected on port: ' + puerto);
	var message_json = JSON.stringify(message_local);
	conn.send(message_json, function(resp, data) {

		});


}else {

	//web server
	var message_local = new classes.message_object('c1_main','c3_web','20','Not connected');
	var message_json = JSON.stringify(message_local);
	conn.send(message_json, function(resp, data) {

		});

}
}

 });




process.on( 'SIGINT', function() {
  console.log( "\nShutting down nicely" );
  
	//mandar msg para cerrar los procesos.
	
	//web server
	var message_local = new classes.message_object('c1_main','c3_web','0');
	var message_json = JSON.stringify(message_local);
	conn.send(message_json, function(resp, data) {
    console.log('Shutting down web server');
		});
  
  
  	//usb_list
	var message_local = new classes.message_object('c1_main','c5_usb','0');
	var message_json = JSON.stringify(message_local);
	conn.send(message_json, function(resp, data) {
    console.log('Shutting down usb list');
		});
  
  //ardu
	var message_local = new classes.message_object('c1_main','c4_ardu','0');
	var message_json = JSON.stringify(message_local);
	conn.send(message_json, function(resp, data) {
    console.log('Shutting down ardu');
		});

  

  
  
delayed.delay(function () { stopcomms(); }, 500);
delayed.delay(function () { stopmain(); }, 1000); 
  
})




function stopmain () {
	
	//console.log('Shutting down Firefox');
	//kill_firefox(proc_firefox);
	//proc.kill('SIGINT');
		
	
  console.log('Shutting down');
 process.exit();

  
}


function stopcomms () {


 //comms server (último) 
  var message_local = new classes.message_object('c1_main','c2_comms','0','0');
	var message_json = JSON.stringify(message_local);
	conn.send(message_json, function(resp, data) {
    console.log('Shutting down comms server');
		});

 
}




function abrir_ardu_comms(p){

child_ardu = exec_ardu('gnome-terminal --title="Arduino Comms" --geometry 73x20+900+500 -x nodejs ardu_comms.js '+p,
function (error, stdout, stderr) {

    if (error !== null) {
        console.log('exec error: ' + error);
    }
    ardu_on = 1;
});


}


function abrir_usb(){

child_usb = exec_usb('gnome-terminal --title="Arduino Comms" --geometry 73x20+900+500 -x nodejs usb_list.js',
function (error, stdout, stderr) {

    if (error !== null) {
        console.log('exec error: ' + error);
    }
    usb_list_on = 1;
});


}



function firefoxfunction1(){


var exec = require('child_process').exec

exec('google-chrome \"127.0.0.1:8070/index.html\"' , function(err) {
if(err){ //process error
}

else{ console.log("firefox lanzado")
}

})


}


function firefoxfunction(proc){




proc('google-chrome \"127.0.0.1:8070/index.html\"' , function(err) {
	
if(err){ //process error

console.log('Error chrome: ' + err)

}

else{ console.log("chrome lanzado")
}

})


}

function kill_firefox(proc) {


proc.kill('SIGINT');

}



//funcion de test para simular envio de información de arduino


var juan = 0;
var a = 0;
var pepe = 1024;

if (testmode == 1) {

setInterval(function(){ 
	 
	 //test_radar();
	 test_radar();
	 
	 }, 100); 


}


function test_radar()
{
	

if(juan < 1024 && a==0){ juan = juan + 10;}
if(juan >= 1024){ a = 1;}
if(juan > -1 && a == 1){ juan = juan - 10;}
if(juan <= 0){ a = 0;}




if(juan > 200 && juan < 400){
	jurjur = Math.floor(Math.random() * 100) + 200;
	
	msg_tuple1 = {

param:"A",
angle_value:juan,
value_number:jurjur

};
}else if(juan > 900 && juan < 1000){
	
	jurjur = Math.floor(Math.random() * 100) + 700;
	
	
	msg_tuple1 = {

param:"A",
angle_value:juan,
value_number:jurjur

};


}else {
	
	msg_tuple1 = {

param:"A",
angle_value:juan,
value_number:0

};
	

	
}

	
var message_local = new classes.message_object('c4_main','c3_web','100',msg_tuple1);

//parseo json

var message_json = JSON.stringify(message_local);

//console.log(message_json)
//envio información
conn.send(message_json, function(resp, data) {});	



   
}





function test_two_sensors()
{



if(juan < 1024 && a==0){ juan = juan + 10;pepe = pepe - 10;}
if(juan >= 1024){ a = 1;}
if(juan > -1 && a == 1){ juan = juan - 10;pepe = pepe + 10;}
if(juan <= 0){ a = 0;}



	
	msg_tuple1 = {

param:"A",
value:juan

};
	
	msg_tuple2 = {

param:"B",
value:pepe

};
	


	
var message_local = new classes.message_object('c4_main','c3_web','100',msg_tuple1);
var message_local1 = new classes.message_object('c4_main','c3_web','100',msg_tuple2);

//parseo json

var message_json = JSON.stringify(message_local);
var message_json1 = JSON.stringify(message_local1);


//envio información
conn.send(message_json, function(resp, data) {});	
conn.send(message_json1, function(resp, data) {});	



   
}




