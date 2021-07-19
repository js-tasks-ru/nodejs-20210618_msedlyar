const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      try {
        const handler = handleGetMethod(filepath, pathname);

        if (200 !== handler.code) {
          res.statusCode = handler.code;
          res.end(handler.message);
          break;
        }

        const fileStream = fs.createReadStream(filepath);

        fileStream.pipe(res);
      } catch (err) {
        res.statusCode = 500;
        res.end('Something went wrong');
      }

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

const handleGetMethod = (filepath, pathname) => {
  const isFile = fs.existsSync(filepath);
  let code = 200;
  let message = '';

  if (-1 !== pathname.search('/')) {
    code = 400;
    message = 'Filename is`n correct. It must not include the slash';

    return { code, message };
  }

  if (!isFile) {
    code = 404;
    message = 'File in not found';

    return { code, message };
  }

  return { code, message };
};

module.exports = server;
