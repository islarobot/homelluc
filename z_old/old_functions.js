

function select_project_function(file){

request({ 
  url: config.jsonurl + file,
  proxy: config.proxy
}, function (err, res, body) {
  // check for presence of err here
  // do something with imgBuffer, like save it to a file
  //ind = JSON.parse(body);
  
  io.emit('project_selected',body);	
  //console.log(body);
})



}



function request_resend_projects_function(){

//Cache-Control:private, no-cache, no-store, must-revalidate, max-age=0
//Pragma:no-cache

request({ 
	headers: {
      'Cache-Control':'private, no-cache, no-store, must-revalidate, max-age=0'

    },
  url: config.jsonurl + 'index.json',
  //proxy: config.proxy
}, function (err, res, body) {
  // check for presence of err here
  // do something with imgBuffer, like save it to a file
  //ind = JSON.parse(body);

  io.emit('projects',body);	
  //console.log(body);
})

}



