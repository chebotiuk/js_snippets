'use strict'

const fs = require('fs')
const zlib = require('zlib')
const http = require('http')

const once = fn => (...args) => {
  if (!fn) return
  const result = fn(...args)
  fn = null
  return result
}

const prepareCache = callback => {
  callback = once(callback)
  let buffer = null

  const rs = fs.createReadStream('../fs/public/lorem.txt')
  const gs = zlib.createGzip()

  const buffers = []

  gs.on('data', buffer => {
    buffers.push(buffer)
  })

  gs.once('end', () => {
    buffer = Buffer.concat(buffers)
    callback(null, buffer)
  })

  rs.on('error', callback)
  gs.on('error', callback)

  rs.pipe(gs)
}

const startServer = (err, buffer) => {
  if (err) throw err

  const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Encoding': 'gzip' })
    response.end(buffer)
  })

  server.listen(8000)
}

prepareCache(startServer)
