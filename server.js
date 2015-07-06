var express = require('express');
var app = express();
var fs = require("fs");
// var bodyParser = require('body-parser');
var multer = require('multer'); 


// static files ---------------
app.use(express.static(__dirname +'/public'));


// Automatically parses form data ( for form submit )
// app.use(bodyParser.json()); 
app.use(multer()); // for parsing multipart/form-data


function listProjects(){
	var list = [];
	var dir = "/home";
	fs.readdirSync(dir).forEach(function(file){
		list.push(file);
	});
	return list;
}





// templates --------------------------------------------------------------------------------------------

app.engine('html', require('hogan-express'));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// 

var head;	// -----------  header  inclue ----------- \\
fs.readFile( __dirname +'/public/header.html', function (err,data) {
  	if (err) { return console.log(err); }
  	else {   head = data;  }
});





// verbs ---------------------------------------------------------------------------------------------

app.get('/', function (req, res){
	var host = req.get('host');

	if(host === "wwwired.net"){ res.sendFile('/home/nick/www/index.html'); } 

	else {
		res.render('index', { title: 'WWWIRED', sites:listProjects(), header:head });	
	}
});

app.get('/01', function (req, res){ res.render('01', { header:head }); });
app.get('/02', function (req, res){ res.render('02', { header:head }); });
app.get('/03', function (req, res){ res.render('03', { header:head }); });
app.get('/04', function (req, res){ res.render('04', { header:head }); });
app.get('/05', function (req, res){ res.render('05', { header:head }); });
app.get('/06', function (req, res){ res.render('06', { header:head }); });
app.get('/07', function (req, res){ res.render('07', { header:head }); });
app.get('/08', function (req, res){ res.render('08', { header:head }); });
app.get('/09', function (req, res){ res.render('09', { header:head }); });
app.get('/10', function (req, res){ res.render('10', { header:head }); });
app.get('/bonus1', function (req, res){ res.render('bonus1', { header:head }); });
app.get('/bonus2', function (req, res){ res.render('bonus2', { header:head }); });


app.post('/answer', function(req, res){ // for forms ----------------
 
  if(req.body.name == "nick" || req.body.name == "jim" ){
  	  	
		fs.readFile('responses.json', 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			obj[ req.body.day ][req.body.name] = req.body.answer

			jsonString = JSON.stringify( obj, null, 4 );

			fs.writeFile("responses.json", jsonString, function(err) {
			    if(err) { return res.json(err); }
			    res.render('answer', { title: 'Submitted!', name:req.body.name, header:head  });
			}); 
		});

  } else {
  		res.json( 'woops! looks like you might have mispelled your name, go back and try again :)');
  }

});

app.get('/log', function(req, res) {	// log of answers
	fs.readFile('responses.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		jsonString = JSON.stringify( obj );
		res.render('log', { title: 'Wired Log', json:jsonString });	

	});
});


// ----- this is for the nbriz user created this way: 
// http://solderintheveins.co.uk/2011/03/ubuntu-sftp-only-account-how-to/
// -
// sudo useradd -d /home/bob -s /usr/lib/sftp-server -M -N -g sftponly bob
// sudo passwd bob 
// sudo mkdir -p /home/bob/www
// sudo chown bob:sftponly /home/bob/www

app.get('/nick', function(req, res) {
    res.sendFile('/home/nick/www/index.html');
});







// server -------------------------------------------------------------------------

var server = app.listen(80, function () {
// var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
