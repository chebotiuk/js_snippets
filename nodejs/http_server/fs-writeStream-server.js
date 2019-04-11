var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  if (req.url === '/paradise.txt') {
    var stream = fs.createReadStream('../fs/public/lorem.txt');

    sendFile(stream, res);
  } else {
    res.statusCode = 404;
    res.end(res.statusCode + ' Page not found');
  }
}).listen(8000);

function sendFile(stream, res) {
  stream.pipe(res);

  stream.on('error', function(err) {
    res.statusCode = 500;
    res.end('Server error');
    console.error(err);
  });

  res.on('close', function() {
    stream.destroy();
  });
}
