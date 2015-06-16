//===========================================================
//======================== EXPRESS ==========================
//===========================================================

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(4000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening at http://%s:%s', host, port);
});

//setup static file routing
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index.html');
})

app.get('/ua', function(req, res){

	var userAgent = req.headers['user-agent'];

	console.log(req.headers);

    res.send('user ' + userAgent);

    console.log ("got request from > " + userAgent);

});