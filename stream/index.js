const fs = require('fs');

const readableStream = fs.createReadStream('input.txt', {
  highWaterMark: 10
});

const writableStream = fs.createWriteStream('output.txt');

readableStream.on('readable', () => {
  try {
    writableStream.write(`${readableStream.read()}`);
    writableStream.write('\n');
  } catch (error) {
    // catch error
  }
});

readableStream.on('end', () => {
  writableStream.end();
});