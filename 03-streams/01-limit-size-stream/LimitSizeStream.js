const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.totalSize = 0;
    this.err = null;
  }

  _transform(chunk, encoding, callback) {
    this.totalSize += Buffer.byteLength(chunk);

    if (this.totalSize > this.limit) {
      this.err = new LimitExceededError();
    }

    callback(this.err, chunk)
  }
}

module.exports = LimitSizeStream;
