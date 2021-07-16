const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.arr = [];
    this.limit = 0;
    this.firstChunk = '';
  }

  _transform(chunk, encoding, callback) {
    let str = Buffer.from(chunk).toString();
    // let isEOL = str.search(os.EOL);

    // if (isEOL !== -1) {
      this.arr = str.split(os.EOL);
      this.limit = this.arr.length;
    // } else {
      if (this.firstChunk !== '') {
        let c = this.firstChunk + chunk;
        callback(null, c);
        return;
      }
      // this.firstChunk = str;
      // callback();
      // return;
    // }

    this.arr.forEach((chunk, index) => {
      let c = chunk;
      if (this.firstChunk !== '') {
        c = this.firstChunk + chunk;
        this.firstChunk = '';
      }

      // if ((this.limit - 1) === index) {
      //   this.firstChunk = c;
      // } else {
        this.push(c);
      // }
    });

    callback();
  }

  _flush(callback) {
    callback();
  }
}

module.exports = LineSplitStream;
