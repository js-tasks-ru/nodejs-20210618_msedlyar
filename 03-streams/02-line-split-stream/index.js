const LineSplitStream = require('./LineSplitStream');
const os = require('os');

const lines = new LineSplitStream({
  encoding: 'utf-8',
});

let i = 0;
function onData(line) {
  console.log(line, 'line - ' + i++);
}

lines.on('data', onData);

lines.write(`0 строка`);
lines.write(`первая строка${os.EOL}вторая строка${os.EOL}третья строка`);
lines.write(`4 строка`);

lines.end();
