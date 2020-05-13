// console.log(
//   process.memoryUsage(),
//   process.memoryUsage().heapUsage,
//   process.execPath,
//   process.execArgv,
//   process.arch,
//   process.config,
//   process.pid,
//   process.platform,
//   process.title,
//   process.cwd(),
//   process.getuid(),
//   process.argv
// )

// console.log(Buffer.from([57, 51, 52, 53, 54, 55, 56, 57, 58, 36], 'utf8').toJSON())

// const http = require('http')

// http.get('http://ietf.org/', res => {
//   console.log(res.req._header);
//   console.dir(res.headers);
//   if (res.statusCode !== 200) {
//     const { statusCode, statusMessage } = res;
//     console.error(`Status Code: ${statusCode} ${statusMessage}`);
//     return;
//   }
//   res.setEncoding('utf8');
//   const body = [];
//   res.on('data', chunk => {
//     body.push(chunk);
//   });
//   res.on('end', () => {
//     body = body.join();
//   });
// });
