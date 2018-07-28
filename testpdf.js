



sendPdf = function(req, res) {

https = require('https')
  //var donneRecu = req.body;

  //console.log(donneRecu['lien']);

  //var url = donneRecu['lien']; //pdf link
  
  var url = 'https://github.com/islarobot/arduino-projects/raw/master/introduction.pdf'

  https.get(url, function(response) {

      var chunks = [];

      response.on('data', function(chunk) {

          console.log('downloading');

          chunks.push(chunk);

      });

      response.on("end", function() {

          console.log('downloaded');

          var jsfile = new Buffer.concat(chunks).toString('base64');

          console.log('converted to base64');

          res.header("Access-Control-Allow-Origin", "*");

          res.header("Access-Control-Allow-Headers", "X-Requested-With");

          res.header('content-type', 'application/pdf');

          res.send(jsfile);

      });

  }).on("error", function() {

      callback(null);

  }); 

}