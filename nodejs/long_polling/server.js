var http = require('http');
var fs = require('fs');
var url = require('url');
var chat = require('./chat');

http.createServer(function(req, res) {
  switch (req.url) {
  case '/':
    sendFile('./public/index.html', res);
    break;
  case '/subscribe':
    chat.subscribe(req, res)
    break;
  case '/publish':
    var body = '';

    req
      .on('readable', function() {
        var chunk = req.read();

        if (chunk !== null) {
          body += chunk;
        }

        if (body.length > 1e4) {
          res.statusCode = 413;
          res.end('Your message is too big!');
        }
      })
      .on('end', function() {
        try {
          console.log(body);
          body = JSON.parse(body);
        } catch (err) {
          res.statusCode = 400;
          res.end('Bad request');
          return;
        }

        chat.publish(body.message);
        res.end('ok');
      })
    break;
  default:
    res.statusCode = 404;
    res.end('Not found');
  }
}).listen(8090);

function sendFile(fileName, res) {
  var data = new fs.ReadStream(fileName);
  data.on('error', function() {
    res.statusCode = 500;
    res.end('server error');
    console.error(err);
  });
  data.pipe(res);
  res.on('close', function() {
    data.destroy();
  });
}
