var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function (req, res) {
  if (req.url == '/digits') {

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache'
    });

    var i = 0;

    write();

    function write() {
      const b1 = Buffer.alloc(1000000).fill('A')
      console.log(b1);
      res.write(b1);
    }
  } else {
    file.serve(req, res);
  }
}).listen(8080)
