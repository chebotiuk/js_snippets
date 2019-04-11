var http = require('http');
var url = require('url');

var server = new http.Server();
server.listen(5000, 'localhost');

server.on('request', function(req, res) {
  var urlParsed = url.parse(req.url, true); // true - разбираем запрос в объект
  debugger;

  if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
    res.statusCode = 200; // Ok
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404; // Not Found
    res.end(res.statusCode + ' Page not found');
  }
});

console.log('server started')
