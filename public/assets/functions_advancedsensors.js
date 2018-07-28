

function drawmarcas_generic(id, x, y, w, h, startAngleDeg, endAngleDeg, radius, largopata, largotexto, deltax, resolucion){

//id: id del canvas
//x, y: centro de la circunferencia
//w, h: ancho y alto del rectángulo.
//start/end angle deg: ángulo en grados de comienzo y de fin. convención: el 0 en el norte.
//radius: radio de la circunferencia.
//largo pata: largo del indicador del grado
// largo texto: distancia de los números al arco.
// deltax: corrección horizontal de los números negativos 


	var canvas = document.getElementById(id);

	canvas.width  = w;
	canvas.height = h;
   var context = canvas.getContext('2d');

	var a;
	var b;
   var a1;
   var b1;
   var a2;
   var b2;


   var alfarad;
   var alfadeg;

   startAngleDegR = startAngleDeg - 90;
   if (startAngleDegR < 0){startAngleDegR = 360 + startAngleDegR;}
   endAngleDegR = endAngleDeg - 90;
   if (endAngleDegR < 0){endAngleDegR = 360 + endAngleDegR;}
   var centerAngleDeg = (endAngleDegR + startAngleDegR)/2;
   if (centerAngleDeg*2 < 360){centerAngleDeg = 360 - 2*centerAngleDeg;}



   var startAngle = startAngleDegR * ( Math.PI / 180 );
   var endAngle = endAngleDegR * ( Math.PI / 180 );

      
      
	context.clearRect(0, 0, w, h);
   context.beginPath();
   context.arc(x, y, radius, startAngle, endAngle, false);
   //context.arc(0, 0, 1000, 200, 300, false);
   context.lineWidth = 2;
       
   context.font = "10px Arial";

	
	//dibujo las líneas de los palitos negativos.


	var startAngleDegD = startAngleDeg;	
	var endAngleDegD = endAngleDeg;
	if (endAngleDegD < startAngleDegD) {endAngleDegD = endAngleDegD + 360;}



	for(alfadeg = startAngleDegD;alfadeg<=endAngleDegD;alfadeg = alfadeg + resolucion){

       alfarad = alfadeg * (Math.PI/180);

//        b = y - Math.abs(radius * Math.sin(alfarad));
//			a = x - Math.abs(radius * Math.cos(alfarad));

			b = y - radius * Math.cos(alfarad);
			a = x + radius * Math.sin(alfarad);
		

			
			b1 = b - largopata * Math.cos(alfarad);
			a1 = a + largopata * Math.sin(alfarad);
				
			b2 = b - largotexto * Math.cos(alfarad);
			a2 = a + largotexto * Math.sin(alfarad);
     
      context.moveTo(a, b);
      context.lineTo(a1, b1);
      var alfadeg1t = alfadeg;
      if (alfadeg1t => 360) {alfadeg1t = 360 - alfadeg;}
      if (alfadeg1t < 360) {alfadeg1t = alfadeg - 360;}
      context.fillText(alfadeg1t,a2-deltax,b2-2);
	}


	context.font="20px Arial";
	context.fillText('Value: ',10,20);	
	//context.fillText('Value: '+z.toFixed(2),10,20);		
	
	context.stroke();
	

	}





function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


function loopangle_generic(z, context, w, h, x, y, initial_angle, end_angle){
	var angleradz = (z + 180) * ( Math.PI / 180 );
	context.clearRect(0, 0, width, height);
	drawmarcas(x,y);
	context.font="20px Arial";
	context.fillText('Value: '+z.toFixed(2),10,20);		
	context.save();
		
	context.translate(x, y);
	context.rotate(angleradz);
	
	drawarrow();
	z++;
	context.restore();	
	//clearCanvas();	
	if(z == 25){z = -25;}
	context.strokeStyle = 'black';
	//  document.getElementById('pepe').innerHTML = 'Value: ' + z;
	context.stroke();
	}
	
function drawarrow_generic(context){
	
	context.moveTo(0, 0);
   context.lineTo(0, 1395);
	context.lineTo(5, 1385);
	context.moveTo(0, 1395);
	context.lineTo(-5, 1385);
     	
	}





function loopangle(){
	var angleradz = (z + 180) * ( Math.PI / 180 );
	context.clearRect(0, 0, width, height);
	drawmarcas(x,y);
	context.font="20px Arial";
	context.fillText('Value: '+z.toFixed(2),10,20);		
	context.save();
		
	context.translate(x, y);
	context.rotate(angleradz);
	
	drawarrow();
	z++;
	context.restore();	
	//clearCanvas();	
	if(z == 25){z = -25;}
	context.strokeStyle = 'black';
	//  document.getElementById('pepe').innerHTML = 'Value: ' + z;
	context.stroke();
	}


function loopangle1(){
	var angleradz = (z1 + 180) * ( Math.PI / 180 );
	context1.clearRect(0, 0, width1, height1);
	drawmarcas1(x1,y1);
	context1.font="20px Arial";
	context1.fillText('Value: '+ z1.toFixed(2),10,20);		
	context1.save();
		
	context1.translate(x1, y1);
	context1.rotate(angleradz);
	
	drawarrow1();
	z1--;
	context1.restore();	
	//clearCanvas();	
	if(z1 == -25){z1 = 25;}
	context1.strokeStyle = 'black';
	 // document.getElementById('pepe1').innerHTML = 'Value: ' + z1;
	context1.stroke();
	}


	function drawarrow(){
	
	context.moveTo(0, 0);
        context.lineTo(0, 1395);
	context.lineTo(5, 1385);
	context.moveTo(0, 1395);
	context.lineTo(-5, 1385);

	
     	
	}
	
	function drawarrow1(){
	
	context1.moveTo(0, 0);
        context1.lineTo(0, 1395);
	context1.lineTo(5, 1385);
	context1.moveTo(0, 1395);
	context1.lineTo(-5, 1385);

	
     	
	}
	

function drawmarcas(x,y){

	var a;
	var b;
      	var a1;
      	var b1;
      	var a2;
      	var b2;
	
      	var c1 = 1410;
      	var alfarad;
      	var alfadeg;
      	var deltax = 13;

      
      var radius = 1400;
      var startAngleDeg = 245;
      var endAngleDeg = 295;
      var startAngle = startAngleDeg * ( Math.PI / 180 );
      var endAngle = endAngleDeg * ( Math.PI / 180 );
      //var startAngle = 1.4 * ( Math.PI / 1 );
      //var endAngle = 1.6 * ( Math.PI / 1 );
      var counterClockwise = false;
      var largopata = 10;
      var largotexto = 10;
      
      

      context.beginPath();
      context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      context.lineWidth = 2;
       
      //context.beginPath();
     // context.moveTo(600, 100);
     // context.lineTo(600, 90);
      
      //indicadores con ángulo:
      // x = radio * senalfa
      // y = radio * cos alfa

      // primero de grado en grado

       //radians = degrees * (pi/180)

       //https://goo.gl/CJ7TXY


        context.font = "10px Arial";


	for(alfadeg = 115;alfadeg>90;alfadeg--){
      // alfadeg = 80;
       alfarad = alfadeg * (Math.PI/180);

        b = y - Math.abs(radius * Math.sin(alfarad));
	a = x - Math.abs(radius * Math.cos(alfarad));
        b1 = b - Math.abs(largopata * Math.sin(alfarad));
        a1 = a - Math.abs(largopata * Math.cos(alfarad));
	b2 = b - Math.abs(largotexto * Math.sin(alfarad));
        a2 = a + Math.abs(largotexto * Math.cos(alfarad));
     
      context.moveTo(a, b);
      context.lineTo(a1, b1);
      context.fillText(-alfadeg+90,a2-deltax,b2-2);
	}

	for(alfadeg = 90;alfadeg<116;alfadeg++){
      
       alfarad = alfadeg * (Math.PI/180);

        b = y - Math.abs(radius * Math.sin(alfarad));
	a = x + Math.abs(radius * Math.cos(alfarad));
        b1 = b - Math.abs(largopata * Math.sin(alfarad));
        a1 = a + Math.abs(largopata * Math.cos(alfarad));
	b2 = b - Math.abs(largotexto * Math.sin(alfarad));
        a2 = a + Math.abs(largotexto * Math.cos(alfarad));
     
      context.moveTo(a, b);
      context.lineTo(a1, b1);
	
	context.fillText(alfadeg-90,a2,b2-2);
      
	}
	
	//context.strokeStyle = 'black';
     	//context.stroke();
	}

	function drawmarcas1(x,y){

	var a;
	var b;
      	var a1;
      	var b1;
      	var a2;
      	var b2;
	
      	var c1 = 1410;
      	var alfarad;
      	var alfadeg;
      	var deltax = 13;

      
      var radius = 1400;
      var startAngleDeg = 245;
      var endAngleDeg = 295;
      var startAngle = startAngleDeg * ( Math.PI / 180 );
      var endAngle = endAngleDeg * ( Math.PI / 180 );
      //var startAngle = 1.4 * ( Math.PI / 1 );
      //var endAngle = 1.6 * ( Math.PI / 1 );
      var counterClockwise = false;
      var largopata = 10;
      var largotexto = 10;
      
      

      context1.beginPath();
      context1.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      context1.lineWidth = 2;
       
      //context.beginPath();
     // context.moveTo(600, 100);
     // context.lineTo(600, 90);
      
      //indicadores con ángulo:
      // x = radio * senalfa
      // y = radio * cos alfa

      // primero de grado en grado

       //radians = degrees * (pi/180)

       //https://goo.gl/CJ7TXY


        context1.font = "10px Arial";


	for(alfadeg = 115;alfadeg>90;alfadeg--){
      // alfadeg = 80;
       alfarad = alfadeg * (Math.PI/180);

        b = y - Math.abs(radius * Math.sin(alfarad));
	a = x - Math.abs(radius * Math.cos(alfarad));
        b1 = b - Math.abs(largopata * Math.sin(alfarad));
        a1 = a - Math.abs(largopata * Math.cos(alfarad));
	b2 = b - Math.abs(largotexto * Math.sin(alfarad));
        a2 = a + Math.abs(largotexto * Math.cos(alfarad));
     
      context1.moveTo(a, b);
      context1.lineTo(a1, b1);
      context1.fillText(-alfadeg+90,a2-deltax,b2-2);
	}

	for(alfadeg = 90;alfadeg<116;alfadeg++){
      
       alfarad = alfadeg * (Math.PI/180);

        b = y - Math.abs(radius * Math.sin(alfarad));
	a = x + Math.abs(radius * Math.cos(alfarad));
        b1 = b - Math.abs(largopata * Math.sin(alfarad));
        a1 = a + Math.abs(largopata * Math.cos(alfarad));
	b2 = b - Math.abs(largotexto * Math.sin(alfarad));
        a2 = a + Math.abs(largotexto * Math.cos(alfarad));
     
      context1.moveTo(a, b);
      context1.lineTo(a1, b1);
	
	context1.fillText(alfadeg-90,a2,b2-2);
      
	}
	
	//context.strokeStyle = 'black';
     	//context.stroke();
	}






function loopangle2(){
	var angleradz = (z2 + 180) * ( Math.PI / 180 );
	context2.clearRect(0, 0, width2, height2);
	drawmarcas2(x2,y2);
	context2.font="15px Arial";
	var q = 90-z2;
	context2.fillText('Value: '+ q.toFixed(2),110,20);	
	context2.save();
		
	context2.translate(x2, y2);
	context2.rotate(angleradz);
	
	drawarrow2();
	z2++;
	context2.restore();	
	//clearCanvas();	
	if(z2 == 102){z2 = 78;}
	context2.strokeStyle = 'black';
	//  document.getElementById('pepe').innerHTML = 'Value: ' + z;
	context2.stroke();
	}





	function drawarrow2(){
	
	context2.moveTo(0, 0);
        //context.lineTo(0, 200);
	context2.lineTo(0, 1190);
	//context.moveTo(-5, 1190);
	context2.lineTo(-10, 1180);
	context2.moveTo(0, 1190);
	context2.lineTo(10, 1180);
     	
	}
	

	

function drawmarcas2(x2,y2){

	var a;
	var b;
      	var a1;
      	var b1;
      	var a2;
      	var b2;
	
      	var c1 = 1190;
      	var alfarad;
      	var alfadeg;
      	var deltax = 3;

      
      var radius = 1200;
      var startAngleDeg = 330;
      var endAngleDeg = 390;
      var startAngle = startAngleDeg * ( Math.PI / 180 );
      var endAngle = endAngleDeg * ( Math.PI / 180 );
      //var startAngle = 1.4 * ( Math.PI / 1 );
      //var endAngle = 1.6 * ( Math.PI / 1 );
      var counterClockwise = false;
      var largopata = 10;
      var largotexto = 10;
      
      

      context2.beginPath();
      context2.arc(x2, y2, radius, startAngle, endAngle, counterClockwise);
      context2.lineWidth = 2;



        context2.font = "10px Arial";


	for(alfadeg = 168;alfadeg<180;alfadeg++){
   
       alfarad = alfadeg * (Math.PI/180);

        b = y2 - Math.abs(radius * Math.sin(alfarad));
	a = x2 + Math.abs(radius * Math.cos(alfarad));
        b1 = b - Math.abs(largopata * Math.sin(alfarad));
        a1 = a + Math.abs(largopata * Math.cos(alfarad));
	b2 = b - Math.abs(largotexto * Math.sin(alfarad));
        a2 = a + Math.abs(largotexto * Math.cos(alfarad));
     
      context2.moveTo(a, b);
      context2.lineTo(a1, b1);
      context2.fillText(180-alfadeg,a2+deltax,b2-2);
	}

	for(alfadeg = 180;alfadeg<193;alfadeg++){
      
       alfarad = alfadeg * (Math.PI/180);

        b = y2 + Math.abs(radius * Math.sin(alfarad));
	a = x2 + Math.abs(radius * Math.cos(alfarad));
        b1 = b + Math.abs(largopata * Math.sin(alfarad));
        a1 = a + Math.abs(largopata * Math.cos(alfarad));
	b2 = b + Math.abs(largotexto * Math.sin(alfarad));
        a2 = a + Math.abs(largotexto * Math.cos(alfarad));
     
      context2.moveTo(a, b);
      context2.lineTo(a1, b1);
	
	context2.fillText(180-alfadeg,a2,b2-2);
      
	}
	
	//context.strokeStyle = 'black';
     	//context.stroke();
	}


function loopanglec(){
	var angleradz = (zc + 180) * ( Math.PI / 180 );
	contextc.clearRect(0, 0, widthc, heightc);
	drawmarcasc(xc,yc);
	contextc.font="20px Arial";
	var q = zc;
	contextc.fillText('Value: '+zeroPad(q.toFixed(2),6),50,20);	
	contextc.save();
		
	contextc.translate(xc, yc);
	contextc.rotate(angleradz);
	
	drawarrowc();
	zc = zc + 0.5;
	contextc.restore();	
	//clearCanvas();	
	if(zc == 360){zc = 0;}
	contextc.strokeStyle = 'black';
	//  document.getElementById('pepe').innerHTML = 'Value: ' + z;
	contextc.stroke();
	}





	function drawarrowc(){
	
	contextc.moveTo(0, 0);
        //context.lineTo(0, 200);
	//contextc.lineTo(0, 10);
	//context.moveTo(-5, 1190);
	contextc.lineTo(0, 200);
	//contextc.moveTo(-10, 190);
	contextc.lineTo(-10, 190);
	contextc.moveTo(0, 200);
     	contextc.lineTo(10, 190);
	}
	

	

function drawmarcasc(xc,yc){

	var a;
	var b;
      	var a1;
      	var b1;
      	var a2;
      	var b2;
	
      	var c1 = 190;
      	var alfarad;
      	var alfadeg;
      	var deltax = 0;

      
      var radius = 200;
      var startAngleDeg = 0;
      var endAngleDeg = 360;
      var startAngle = startAngleDeg * ( Math.PI / 180 );
      var endAngle = endAngleDeg * ( Math.PI / 180 );
      //var startAngle = 1.4 * ( Math.PI / 1 );
      //var endAngle = 1.6 * ( Math.PI / 1 );
      var counterClockwise = false;
      var largopata = 10;
      var largotexto = 20;
      
      

      contextc.beginPath();
      contextc.arc(xc, yc, radius, startAngle, endAngle, counterClockwise);
      contextc.lineWidth = 2;



        contextc.font = "9px Arial";


	for(alfadeg = 0;alfadeg<360;alfadeg = alfadeg + 5){
   
       alfarad = (alfadeg - 270)* (Math.PI/180);

        b = yc - radius * Math.sin(alfarad);
	a = xc + radius * Math.cos(alfarad);
        b1 = b - largopata * Math.sin(alfarad);
        a1 = a + largopata * Math.cos(alfarad);
	b2 = b - largotexto * Math.sin(alfarad);
        a2 = a + largotexto * Math.cos(alfarad);
     
      contextc.moveTo(a, b);
      contextc.lineTo(a1, b1);
      var alfadeg1 = 360 - alfadeg;
	if(alfadeg1 == 360){alfadeg1 = 0;}
	if(alfadeg1 > 180 && alfadeg1 < 360){deltax = -8;}
      contextc.fillText(alfadeg1,a2+deltax,b2);
	}


	}

