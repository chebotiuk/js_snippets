var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(3000);

// var webSocketServer = new WebSocketServer({
//   server: server
// });

var webSocketServer = new WebSocketServer({
  host: 'localhost',
  port: 8080
});

webSocketServer.on('connection', function(ws) {
  var timer = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function(err) {
      if (err) console.error(err);
    });
  }, 100);
  
  console.log('client connected');
  
  ws.on('close', function() {
    console.log('client disconnected');
    clearInterval(timer);
  });
});
