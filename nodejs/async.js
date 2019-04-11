var http = require('http');

var server = new http.Server(function(req, res) {
	console.log('Server started');
}).listen('8000');

process.nextTick(function(){
	console.log('nextTick');
});

setImmediate(function(){
	console.log('setImmediate');
});
