//FUNCIONES list_ports.html


function function_load(){

//funcion de carga de página de puertos

//envío solicitud de listado de puertos.

socket.emit('request_usb','');

//solicito estado

socket.emit('request_state','');

//solicito proyecto activo

socket.emit('request_active_project_info','');

}


function show_hide_button(a) {
    var x = document.getElementById('submit_ports');
    if (a == '1') {
        x.style.display = 'none';
    } else {
        x.style.display = 'initial';
    }
}


function select_usb_port(puerto){
			
//socket.emit('select_usb',puerto);

			
}

function print_list_of_ports(ports){

var tr;
var table = $('<table border = 1>');
for(var i = 0;i < ports.length;i++){
	tr = $('<tr/>');
	var texto = "<a onclick=\"select_usb_port('"+ports[i].comName+"')\" href=\"#\">"+ports[i].comName;
	tr.append("<td>" + texto + "</td>");           		          		
	table.append(tr);			
} 

$('#content').append(table); /*appending the data on the page using Jquery */
}


function print_one_port_connect(puerto){


alert('un puerto')


}                	



function print_no_ports_message(){
	
	alert('no hay puerto')

}                	
		
//funciones projects.html

function print_list_of_projects(projects_object){

var tr;
var table = $('<table border = 1>');
for(var i = 0;i < projects_object.length;i++){
	tr = $('<tr/>');
	var texto1 = projects_object[i].title;
	tr.append("<td><b>" + texto1 + "</td>");           		          		
	table.append(tr);		
	for(var j = 0;j < projects_object[i].projects.length;j++){
	tr = $('<tr/>');
	var texto = "<a onclick=\"select_project('"+projects_object[i].projects[j].file+"')\" href=\"#\">"+projects_object[i].projects[j].name;
	tr.append("<td></td><td columnspan=\"2\">" + texto + "</td>");           		          		
	table.append(tr);		
		
		
}	
		
} 

$('#content').append(table); /*appending the data on the page using Jquery */
}


function select_project(file){
			
socket.emit('select_project',file);
			
}


function open_editor(file){




}


