var http = require('http')
var fs = require('fs')

http.createServer((req,res) => {
  fs.readFile('lorem.txt', 'utf8', (err, data) => {
    res.writeHead(200, {'content-type': 'text-plain'})

    if (err)
      res.write('couldnt open the file\n')
    else
      res.write(data)

    res.end()
  })
}).listen(8080)

console.log('Server running on 8080')
