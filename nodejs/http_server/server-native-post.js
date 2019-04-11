var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile('index.html', function(err, info) {
      if (err) {
        console.log(err);
        res.end('На сервере произошла ошибка!');
        return;
      } else {
        res.end(info);
      }
    });
  } else if (req.url === '/post') {
    var data = '';

    req.setEncoding('utf8');

    req.addListener('data', function(chunk) {
      data+= chunk;
    });

    req.addListener('end', function() {
      res.setHeader('Content-Type', 'application/json');
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Нет такой страницы! Ошибка 404</h1>');
    res.end();
  } 
}).listen(8080);
