const routing = require('./routing')
const url = require('url')

const types = {
  object: object => JSON.stringify(object),
  string: s => s,
  number: n => n.toString,
  undefined: () => 'not found',
  function: (fn, { req, res }, params = []) => {
    req.params = params
    req.query = url.parse(req.url, true)['query']

    const result = fn(req, res)
    const serializer = types[typeof result]
    return serializer(result, { req, res }, params)
  },
}

const matching = []
for (const key in routing) {
  if (key.includes('*')) {
    const regexp = new RegExp(key.replace(/\*/g, '(.*)'))
    const route = routing[key]
    matching.push([regexp, route])
    delete routing[key]
  }
}

const router = client => {
  let params
  let route = routing[client.req.url]
  if (!route) {
    for (let i = 0; i < matching.length; i++) {
      const regexp = matching[i]
      params = client.req.url.match(regexp[0])
      if (params) {
        params.shift()
        route = regexp[1]
        break
      }
    }
  }
  const type = typeof route
  const serializer = types[type]
  return serializer(route, client, params)
}

module.exports = router
