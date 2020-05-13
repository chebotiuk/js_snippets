'use strict'
const http = require('http')
const router = require('./router')

const hostname = 'localhost'
const port = 8000

const server = http.createServer((req, res) => {
  res.end(
    router({ req, res })
  )
}).listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`)
})

server.on('error', err => {
  if (err.code === 'EACCES') {
    console.error(`No access to port ${port}`)
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})
