var fs = require('fs');

// fs.readStream наследует от stream.Readable
var stream = fs.createReadStream('../fs/public/lorem.txt', {encoding: 'utf-8'}); // new fs.ReadStream

var data;

stream.on('readable', function() {
  const chunk = stream.read();

  if (chunk !== null) {
    data += chunk;
  }
})

stream.on('end', function() {
  console.log(data);
})

stream.on('error', function(err) {
  if (err.code === 'ENOENT') {
    console.log('file is not found');
  } else {
    console.log(err);
  }
});
