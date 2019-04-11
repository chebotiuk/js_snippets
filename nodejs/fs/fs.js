var fs = require('fs');
var util = require('util');

// Classic standart
var file = './public/lorem.txt';

fs.readFile(file, /* {encoding: 'utf-8'}, */ function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data); // Buffer
    console.info(data.toString('utf-8')); // toString converts text to 'UTF-8' format (default)
  }
})


// ES6 standart
var readFile = util.promisify(fs.readFile)

readFile(file, {encoding: 'utf-8'})
  .then((data) => { console.info(data) })
  .catch((err) => { throw err })

// ES Async/Await
var readFileAsync = async () => {
  var result = await readFile(file, {encoding: 'utf-8'})
  console.log(result)
}

readFileAsync()
