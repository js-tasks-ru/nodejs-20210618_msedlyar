const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.arr = [];
    this.limit = 0;
    this.previousChunk = '';
  }

  _transform(chunk, encoding, callback) {
    let str = Buffer.from(chunk).toString();
    this.arr = str.split(os.EOL);
    this.limit = this.arr.length;

    this.arr.forEach((chunk, index) => {
      let c = chunk;

      if ('' !== this.previousChunk) {
        c = this.previousChunk + chunk;
        this.previousChunk = '';
      }

      if ((this.limit - 1) === index) {
        this.previousChunk = c;
      } else {
        this.push(c);
      }
    });

    callback();
  }

  _flush(callback) {
    if ('' !== this.previousChunk) {
      this.push(this.previousChunk);
    }
    callback();
  }
}

module.exports = LineSplitStream;
