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

	// regex to parse info between parentehsis' into an array
	var userInfo = userAgent.match(/\(([^)]+)\)/g); 
	
	// grab the first item in the array, that's the device info, and split it at '('
	var deviceInfo = userInfo[0].split('(');
	
	// deviceInfo is also an array, split the second item at the ';'
	deviceInfo = deviceInfo[1].split(';');
	
	// cast the first item in the array as the DeviceType
	var deviceType = deviceInfo[0];
	
	// cast the second item in the array as the Device OS after removing some extra chars and whitespace
	var deviceOS = deviceInfo[1].replace(/\)/g, '');
	deviceOS = deviceOS.trim();

	console.log('Device Type: ' + deviceType);
	console.log('Device OS: '+ deviceOS);

	if (deviceType == 'Macintosh'){
		console.log("It's a Mac!");
	} else if (deviceType == 'iPhone'){
		console.log("It's an iPhone!");
	} else {
		console.log("I don't know what it is!")
	}

	// console.log(req.headers);
    res.send('user ' + userAgent);

});