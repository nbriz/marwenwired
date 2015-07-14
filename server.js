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

	else if(host === "ohnoboi.com"){ 
		app.use(express.static("/home/cole/www"));
		res.sendFile('/home/cole/www/index.html'); 
	} 
	else if(host === "resurrected-eagle.com"){ 
		app.use(express.static("/home/delano/www"));
		res.sendFile('/home/delano/www/index.html'); 
	} 
	else if(host === "the-cheeseburger-apocalypse.com"){ 
		app.use(express.static("/home/evan/www"));
		res.sendFile('/home/evan/www/index.html'); 
	} 
	else if(host === "elenavel.com"){ 
		app.use(express.static("/home/helen/www"));
		res.sendFile('/home/helen/www/index.html'); 
	} 
	else if(host === "3spooki5me.com"){ 
		app.use(express.static("/home/jared/www"));
		res.sendFile('/home/jared/www/index.html'); 
	} 
	else if(host === "kalopsia.xyz"){ 
		app.use(express.static("/home/mecca/www"));
		res.sendFile('/home/mecca/www/index.html'); 
	} 
	else if(host === "heardramen.com"){ 
		app.use(express.static("/home/mikkail/www"));
		res.sendFile('/home/mikkail/www/index.html'); 
	} 
	else if(host === "antihero97.com"){ 
		app.use(express.static("/home/miles/www"));
		res.sendFile('/home/miles/www/index.html'); 
	} 
	else if(host === "everythingcentral.net"){ 
		app.use(express.static("/home/nicholas/www"));
		res.sendFile('/home/nicholas/www/index.html'); 
	} 
	else if(host === "gerudotactics.net"){ 
		app.use(express.static("/home/xavier/www"));
		res.sendFile('/home/xavier/www/index.html'); 
	} 
	else if(host === "theshoeontheleft.com"){ 
		app.use(express.static("/home/zac/www"));
		res.sendFile('/home/zac/www/index.html'); 
	} 
	else if(host === "johari-parris-photography.com"){ 
		app.use(express.static("/home/johari/www"));
		res.sendFile('/home/johari/www/index.html'); 
	} 
	else if(host === "crownthejocelyn.com"){ 
		app.use(express.static("/home/jocelyn/www"));
		res.sendFile('/home/jocelyn/www/index.html'); 
	} 
	else if(host === "yoitzcorona.link"){ 
		app.use(express.static("/home/joselyn/www"));
		res.sendFile('/home/joselyn/www/index.html'); 
	} 

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


  if( req.body.name == "nick" 
  		|| req.body.name == "cole"
  		|| req.body.name == "helen"
  		|| req.body.name == "mikkail"
  		|| req.body.name == "xavier"
  		|| req.body.name == "miles"
  		|| req.body.name == "jared"
  		|| req.body.name == "delano"
  		|| req.body.name == "nicholas"
  		|| req.body.name == "mecca"
  		|| req.body.name == "johari"
  		|| req.body.name == "evan"
  		|| req.body.name == "zac"
  		|| req.body.name == "jocelyn"
  		|| req.body.name == "joselyn"
   ){
  	  	
		fs.readFile( __dirname +'/responses.json', 'utf8', function (err, data) {
			if (err) throw err;
			obj = JSON.parse(data);
			obj[ req.body.day ][req.body.name] = req.body.answer

			jsonString = JSON.stringify( obj, null, 4 );

			fs.writeFile(__dirname +'/responses.json', jsonString, function(err) {
			    if(err) { return res.json(err); }
			    res.render('answer', { title: 'Submitted!', name:req.body.name, header:head  });
			}); 
		});

  } else {
  		res.json( 'woops! looks like you might have mispelled your name, go back and try again :)');
  }

});

app.get('/log', function(req, res) {	// log of answers
	fs.readFile(__dirname +'/responses.json', 'utf8', function (err, data) {
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
// sudo chmod 777 /home/bob/www

app.get('/nick', function(req, res) {
	app.use(express.static("/home/nick/www"));
    res.sendFile('/home/nick/www/index.html');    
});

app.get('/delano', function(req, res) {
	app.use(express.static("/home/delano/www"));
    res.sendFile('/home/delano/www/index.html');    
});

app.get('/cole', function(req, res) {
	app.use(express.static("/home/cole/www"));
    res.sendFile('/home/cole/www/index.html');    
});

app.get('/evan', function(req, res) {
	app.use(express.static("/home/evan/www"));
    res.sendFile('/home/evan/www/index.html');    
});

app.get('/helen', function(req, res) {
	app.use(express.static("/home/helen/www"));
    res.sendFile('/home/helen/www/index.html');    
});

app.get('/jared', function(req, res) {
	app.use(express.static("/home/jared/www"));
    res.sendFile('/home/jared/www/index.html');    
});

app.get('/johari', function(req, res) {
	app.use(express.static("/home/johari/www"));
    res.sendFile('/home/johari/www/index.html');    
});

app.get('/mecca', function(req, res) {
	app.use(express.static("/home/mecca/www"));
    res.sendFile('/home/mecca/www/index.html');    
});

app.get('/mikkail', function(req, res) {
	app.use(express.static("/home/mikkail/www"));
    res.sendFile('/home/mikkail/www/index.html');    
});

app.get('/miles', function(req, res) {
	app.use(express.static("/home/miles/www"));
    res.sendFile('/home/miles/www/index.html');    
});

app.get('/nicholas', function(req, res) {
	app.use(express.static("/home/nicholas/www"));
    res.sendFile('/home/nicholas/www/index.html');    
});

app.get('/xavier', function(req, res) {
	app.use(express.static("/home/xavier/www"));
    res.sendFile('/home/xavier/www/index.html');    
});

app.get('/zac', function(req, res) {
    res.sendFile('/home/zac/www/index.html');
	app.use(express.static("/home/zac/www"));
});

app.get('/jocelyn', function(req, res) {
    res.sendFile('/home/jocelyn/www/index.html');
	app.use(express.static("/home/jocelyn/www"));

});

app.get('/joselyn', function(req, res) {
	app.use(express.static("/home/joselyn/www"));
    res.sendFile('/home/joselyn/www/index.html');    
});



// server -------------------------------------------------------------------------

var server = app.listen(80, function () {
// var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
