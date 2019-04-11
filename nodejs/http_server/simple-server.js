var http = require('http');
var server = new http.Server(); // Event Emitter, 
// тоже что и http.createServer(function(req, res){});

// http.Server -> net.Server -> EventEmitter

server.listen(1337, '127.0.0.1'); // IP и порт

// var emit = server.emit; 
// server.emit = function(event) {
// 	console.log(event);
// 	emit.apply(server, arguments);
// };
server.on('request', function(req, res) {
  console.log('hello server node js');
  
  res.end('Hello world');
});