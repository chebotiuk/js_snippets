const users = [
  { name: 'Paul', id: 13 },
  { name: 'John', id: 55 },
  { name: 'Stue', id: 77 }
]

const routing = {
  '/': '<h1>Welcome to homepage</h1>',
  '/users': ({ name: 'paul' }),
  '/number': 5,
  '/users/*/*': (req, res) => {
    const user = users.find(({ id }) => +req.params[0] === id)

    if (!user) {
      res.writeHead(404, 'User with such id not found', { 'ContentType': 'text/plain' })
      return '404 User Not found'
    }

    res.writeHead(200, 'Success', { 'ContentType': 'application/json' })
    return user
  }
}

module.exports = routing
