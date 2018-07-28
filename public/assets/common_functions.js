//FUNCIONES COMUNES

function get_id_from_param(param_input,vl_array){
			
			 for (var i = 0;i<8;i++) {
			
			if (vl_array[i].param == param_input) {
				
				return vl_array[i].id
				
			}			
			
			}
			return -1
			}

			function hide_fields_show_values(id,vl)
			{
			document.getElementById("val"+id).style.display='none';

			document.getElementById("setvalues_button"+id).innerText="Reset";		
			
			  document.getElementById('vallabel'+id).innerHTML = vl.value_v;

			  


			}
			
			function show_fields_hide_values(id,vl)
			{
			document.getElementById("val"+id).style.display='initial';

			document.getElementById("setvalues_button"+id).innerText="Set Values";		
			
			  document.getElementById('vallabel'+id).innerHTML = '';
			  
			  document.getElementById('val'+id).value = vl.value_v;



			}
        
			function press_button(id,vl){
				

			
			if (vl.state == "set") {
				
			
			
			var val_local = document.getElementById("val"+id).value;
			

			
			vl.value_v = parseInt(val_local);		
			
		
			
			hide_fields_show_values(id,vl)
			vl.state = "reset";
			
			
			
			}else {
				
			show_fields_hide_values(id,vl);	
			vl.state = "set";
				
			}
			
						
			
			}